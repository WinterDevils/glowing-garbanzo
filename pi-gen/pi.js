const admin = require("firebase-admin/app")
const firestore = require("firebase-admin/firestore")
const Decimal = require("decimal.js")
const moment = require("moment")

const serviceAccount = require("./creds/hehui-firebase.json")
admin.initializeApp({ credential: admin.cert(serviceAccount) })
const db = firestore.getFirestore()

function chudnovsky(digits) {
  Decimal.precision = digits + 2

  function factorial(n) {
    var i = 2,
      r = new Decimal(1)
    for (; i <= n; r = r.times(i++));
    return r
  }

  // The number of decimal digits the algorithm generates per iteration.
  var digits_per_iteration = 14.1816474627254776555
  var iterations = digits / digits_per_iteration + 1

  var a = new Decimal(13591409)
  var b = new Decimal(545140134)
  var c = new Decimal(-640320)

  var numerator, denominator
  var sum = new Decimal(0)

  for (var k = 0; k < iterations; k++) {
    // (6k)! * (13591409 + 545140134k)
    numerator = factorial(6 * k).times(a.plus(b.times(k)))

    // (3k)! * (k!)^3 * -640320^(3k)
    denominator = factorial(3 * k)
      .times(factorial(k).pow(3))
      .times(c.pow(3 * k))

    sum = sum.plus(numerator.div(denominator))
  }

  // pi = ( sqrt(10005) * 426880 ) / sum
  return Decimal.sqrt(10005).times(426880).div(sum).toSD(digits)
}

;(async () => {
  const piRef = db.collection("pi").doc("pi")

  const dbPi = await piRef.get()
  // starting at 5000 to not kill my firebase bill on iops
  let currDigit = dbPi.data()?.digits || 1

  do {
    var start = Date.now()
    var pi = chudnovsky(currDigit)
    var timeTaken = Date.now() - start

    await piRef.set({
      value: pi.toString(),
      digits: currDigit,
      timeTaken: timeTaken,
      latest: moment().format("LLLL"),
    })
    currDigit++
  } while (currDigit)
})()
