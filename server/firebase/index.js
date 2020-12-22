
let admin = require("firebase-admin");

let serviceAccount = require("../config/fbServiceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://commerce-bf933.firebaseio.com"
});

module.exports = admin;