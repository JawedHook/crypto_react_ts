const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios');

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://crypto-project-94857.firebaseio.com',
});

const firestore = admin.firestore();

exports.sendNotifications = functions.https.onRequest((request, response) => {
  response.set('Access-Control-Allow-Origin', '*');
  let usersRef = firestore.collection('users').get()
});
