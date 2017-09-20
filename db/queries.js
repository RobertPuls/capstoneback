const db = require('./index');

const saveds = db.get('saveds');
const users = db.get('users');

module.exports = {
  getAllBeats() {
    console.log('queries');
    return saveds.find({});
  },
  create(beat) {
    return saveds.insert(beat);
  },
  createUser(user) {
    return users.insert(user);
  },
  getAllUsers() {
    return users.find({});
  },
  getUser(password) {
    return users.findOne({
        "password": password
      },
      "address"
    ).then(doc => {
      console.log(doc);
      return doc;
    });
  },
  getUserByEmail(user_email) {
    return users.findOne({
      "email": user_email
    }).then((doc) => {
      console.log("doc", doc);
      return doc;
    })
  },
}
