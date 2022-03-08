const functions = require("firebase-functions")
const admin = require("firebase-admin")
admin.initializeApp()
const db = admin.firestore()

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true })
  response.send("Hello from Firebases!")
})

exports.getPi = functions.https.onRequest(async (req, res) => {
  try {
    db.collection("pi")
      .doc("pi")
      .get()
      .then((snapshot) => {
        if (!snapshot.exists) {
          res.status(500).send("No such document!")
        } else {
          res.status(200).json(snapshot.data())
        }
      })
  } catch (error) {
    res.status(500).json(error)
  }
})
