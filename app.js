const express = require('express');
const handlebars = require('express-handlebars').engine;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const Handlebars = require("handlebars");
const { filters, getTagColor } = require('./public/js/filters');
const { isAuthenticated, registerUser, loginUser, logoutUser, db, me } = require('./auth');

const app = express();

app.engine("handlebars", handlebars({
     defaultLayout: "main",
     layoutsDir: path.join(__dirname, 'views', 'layouts'),
     partialsDir: path.join(__dirname, 'views', 'components')
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

Handlebars.registerHelper('eq', function (a, b) {
     return a === b;
});

// Configurando o Body-Parser e Cookies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// Configurando o TailwindCSS
app.use(express.static(path.join(__dirname, 'public')));

// ==================== ROTAS ====================

// ==================== AUTENTICAÇÃO ====================

app.get('/login', (req, res) => {
     res.render('login', { layout: 'auth' })
});

app.get('/register', (req, res) => {
     res.render('register', { layout: 'auth' })
});

app.post('/register', (req, res) => { registerUser(req, res) });

app.post('/login', loginUser);

app.get('/logout', logoutUser);

app.get('/me', isAuthenticated, me);

// ==================== AUTENTICAÇÃO ====================

app.get("/", isAuthenticated, async function (req, res) {
     const search = req.query.search ? req.query.search.toLowerCase() : "";
     const recipes = db.collection('Recipe');
     const snapshot = await recipes.get();

     var recipelist = [];

     snapshot.forEach(doc => {
          const data = doc.data();

          // Processa as tags para separar título e cor
          if (data.tags && Array.isArray(data.tags)) {
               data.tags = data.tags.map(tag => {
                    const [text] = tag.split(',').map(str => str.trim());
                    const color = getTagColor(text);
                    return { text, color };
               });
          }

          if (!search || data.title.toLowerCase().includes(search)) {
               recipelist.push({ id: doc.id, ...data });
          }
     });

     res.render('index', { layout: 'main', feed: recipelist, query: search, route: '/' });
});

app.get("/library", isAuthenticated, async function (req, res) {
     try {
          const search = req.query.search ? req.query.search.toLowerCase() : "";
          const userEmail = req.user.email;

          const recipes = db.collection('Recipe').where('userEmail', '==', userEmail);
          const snapshot = await recipes.get();

          const recipelist = [];
          snapshot.forEach(doc => {
               const data = doc.data();

               if (data.tags && Array.isArray(data.tags)) {
                    data.tags = data.tags.map(tag => {
                         const [text] = tag.split(',').map(str => str.trim());
                         const color = getTagColor(text);
                         return { text, color };
                    });
               }

               if (!search || data.title.toLowerCase().includes(search)) {
                    recipelist.push({ id: doc.id, ...data });
               }
          });

          res.render("library", { layout: 'main', recipes: recipelist, query: search, route: '/library' });
     } catch (error) {
          console.error("Erro ao consultar o Firestore:", error);
          res.status(500).send("Erro ao carregar a biblioteca.");
     }
});


app.get('/details/:id', async (req, res) => {
     const id = req.params.id;
     const docRef = db.collection("Recipe").doc(id);
     const doc = await docRef.get();
     if (doc.exists) {
          const recipe = doc.data();

          if (recipe.tags && Array.isArray(recipe.tags)) {
               recipe.tags = recipe.tags.map(tag => {
                    const [text] = tag.split(',').map(str => str.trim());
                    const color = getTagColor(text);
                    return { text, color };
               });
          }

          res.render('infoRecipe', { layout: 'main', recipe, id });
     } else {
          res.status(404).send("Receita não encontrada.");
     }
});

app.get('/create', (req, res) => {
     res.render('createRecipe', { layout: 'main', filters: filters });
});

app.post("/create", isAuthenticated, async function (req, res) {
     try {
          const { title, ingredients, preparing, preparingTime, tags } = req.body;
          const userName = req.user.name;
          const userEmail = req.user.email;

          // Valida campos obrigatórios
          if (!title || !ingredients || !preparing || !preparingTime) {
               return res.status(400).send("Todos os campos são obrigatórios.");
          }

          // Garante que tags sejam sempre um array
          const processedTags = Array.isArray(tags) ? tags : tags ? [tags] : [];

          await db.collection("Recipe").add({
               title,
               ingredients,
               preparing,
               preparingTime,
               tags: processedTags,
               userName,
               userEmail,
          });

          res.redirect("/library"); // Redireciona para a biblioteca
     } catch (error) {
          console.error("Erro ao criar receita:", error);
          res.status(500).send("Erro ao criar a receita.");
     }
});

app.get("/edit/:id", function (req, res) {
     const id = req.params.id;
     var docRef = db.collection("Recipe").doc(id);

     docRef.get().then((doc) => {
          if (doc.exists) {
               const recipe = doc.data();

               const updatedFilters = filters.map(filter => {
                    return {
                         ...filter,
                         tags: filter.tags.map(tag => ({
                              ...tag,
                              selected: recipe.tags.includes(tag.name) // Marca como selecionado
                         }))
                    };
               });

               res.render("editRecipe", { recipe: recipe, id: id, filters: updatedFilters });
          } else {
               console.log("Receita não encontrada.");
               res.status(404).send("Receita não encontrada.");
          }
     }).catch((error) => {
          console.log("Erro ao buscar receita:", error);
          res.status(500).send("Erro interno ao buscar receita.");
     });
});


app.get("/delete/:id", async function (req, res) {
     const id = req.params.id;
     try {
          await db.collection('Recipe').doc(id).delete();
          res.redirect('/library');
     } catch (error) {
          console.error(error);
     }
})

app.post("/update/:id", function (req, res) {
     const id = req.params.id;
     var docRef = db.collection("Recipe").doc(id);

     // Obter dados do formulário
     const updatedData = {
          title: req.body.title,
          ingredients: req.body.ingredients,
          preparing: req.body.preparing,
          preparingTime: req.body.preparingtime,
          tags: Array.isArray(req.body.tags) ? req.body.tags : [req.body.tags], // Garante que seja um array
     };

     // Atualizar documento no Firestore
     docRef.update(updatedData)
          .then(() => {
               res.redirect('/library');
          })
          .catch((error) => {
               console.error("Erro ao atualizar receita:", error);
               res.status(500).send("Erro ao atualizar a receita.");
          });
});

// ==================== SERVIDOR ====================

app.listen(8081, function () {
     console.log("Servidor ativo! Clique na URL: http://localhost:8081");
});
