const { initializeApp, cert } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');
const { getFirestore } = require('firebase-admin/firestore');
const serviceAccount = require('./service-account.json');

initializeApp({ credential: cert(serviceAccount) });

const auth = getAuth();
const db = getFirestore();

async function isAuthenticated(req, res, next) {
     const authToken = req.cookies.authToken || req.headers.authorization

     if (!authToken) { return res.redirect('/login') }

     try {
          const decodedToken = await auth.verifyIdToken(authToken)
          req.user = { 
               uid: decodedToken.uid, 
               email: decodedToken.email, 
               name: decodedToken.name
          }; // Adiciona os dados do usuário no req
          next()
     } catch (error) {
          console.error("Erro na autenticação:", error)
          res.redirect('/login')
     }
}

async function registerUser(req, res) {
     const { name, email, password } = req.body;

     if (!name || !email || !password) {
          return res.status(400).json({ message: "Preencha todos os campos!" });
     }

     try {
          const userRecord = await auth.createUser({
               displayName: name,
               email,
               password,
          });

          const userRef = db.collection('usuarios').doc(userRecord.uid);
          await userRef.set({
               email,
               name,
          });

          res.status(201).json({ message: "Usuário registrado com sucesso!" });
     } catch (error) {
          console.error("Erro ao registrar o usuário:", error);

          if (error.code === 'auth/email-already-exists') {
               return res.status(400).json({ message: "Este e-mail já está em uso." });
          }

          res.status(500).json({ message: "Erro ao registrar o usuário." });
     }
}


async function loginUser(req, res) {
     const { token } = req.body

     try {
          const decodedToken = await auth.verifyIdToken(token)
          const uid = decodedToken.uid

          const userRef = db.collection('usuarios').doc(uid)
          const userDoc = await userRef.get();

          if (!userDoc.exists) {
               await userRef.set({
                    email: decodedToken.email || "Usuário",
                    nome: decodedToken.name
               });
          }

          res.cookie('authToken', token, { httpOnly: true, secure: true });
          res.redirect('/');
     } catch (error) {
          console.error('Erro ao verificar o token:', error);
          res.status(401).json({ success: false, message: 'Falha na autenticação' });
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
