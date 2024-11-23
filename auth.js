const { initializeApp, cert } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');
const { getFirestore } = require('firebase-admin/firestore');
const serviceAccount = require('./service-account.json');

initializeApp({ credential: cert(serviceAccount) });

const auth = getAuth();
const db = getFirestore();


async function isAuthenticated(req, res, next) {
     const authToken = req.cookies.authToken;

     if (!authToken) {
          console.log("Cookie 'authToken' ausente.");
          return res.redirect('/login'); // Redireciona para login se o token não estiver presente
     }

     try {
          const decodedToken = await auth.verifyIdToken(authToken);
          req.user = {
               uid: decodedToken.uid,
               email: decodedToken.email,
               name: decodedToken.name,
          };
          console.log("Usuário autenticado no middleware:", req.user);
          next();
     } catch (error) {
          console.error('Erro ao verificar o token no middleware:', error);
          req.user = null;
          res.redirect('/login'); // Redireciona para login em caso de erro
     }
}


async function registerUser(req, res) {

}

async function loginUser(req, res) {
     const { token } = req.body;

     try {
          const decodedToken = await auth.verifyIdToken(token);
          res.cookie('authToken', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
     } catch (error) {
          console.error('Erro ao verificar o token:', error);
     }
}

async function me(req, res) {
     if (req.user) {
          res.json({ name: req.user.name, email: req.user.email });
     } else {
          res.status(401).json({ error: "Usuário não autenticado." });
     }
}


function logoutUser(req, res) {
     res.clearCookie('authToken');
     res.redirect('/login');
}

module.exports = {
     auth,
     db,
     me,
     isAuthenticated,
     loginUser,
     logoutUser,
     registerUser
};
