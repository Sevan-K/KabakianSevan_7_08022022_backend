console.log("Hello world!");

// on se synchronyse avec la base de donnée
const db = require("./models");
db.sequelize
  .sync()
  .then(() => {
    console.log("Connection has been established successfully.");
    // ajouter le listen à l'intérieur
  })
  .catch((error) => console.log("Unable to connect to the database:", error));

// on fait appel au modèle
const { User } = require("./models");

// select all
const selectAllTest = () => {
  User.findAll({ where: { id: 1 } })
    .then((users) => console.log("Tout les utilisateurs : ", users))
    .catch((error) => console.log(error));
};
// selectAllTest();

// select one
const selectOneTest = () => {
  User.findAll({ where: { id: 1 } })
    .then((user) => console.log("Utilisateur avec un id de 1 :", user))
    .catch((error) => console.log(error));
};
// selectOneTest();

// insert
const insertTest = () => {
  User.create({ email: "sevan.kabakian@hotmail.fr", pseudo: "blabla_test" })
    .then()
    .catch((error) => console.log(error));
};

// modify
async function modifyTest() {
  // création d'un nouvel utilisateur
  const testSK = await User.create({
    email: "sevan.kabakian@test.fr",
    pseudo: "test2",
  });
  // on affiche l'élément créé
  console.log("utilisateur crée :", testSK);
  // on modifie le pseudo de l'utilisateur
  testSK.pseudo = "test_de_fou";
  // on enregistre les modifications
  await testSK.save();
  // on les affiches
  console.log("Utilisateur avec le nouveau pseudo", testSK);
  // on supprime l'utilisateur
  await testSK.destroy();
}
modifyTest();

// delete
const deleteOneTest = () => {
  User.destroy({ where: { id: 11 } })
    .then(console.log("Element supprimé"))
    .catch((error) => console.log(error));
};
// deleteOneTest();
