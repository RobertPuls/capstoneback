const db = require('./index');

const beats = db.get('beats');
const users = db.get('users');

module.exports = {
  getAllBeats() {
    console.log('queries');
    return beats.find({});
  },
  create(beat) {
    return beats.insert(beat);
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
      return doc
    });
  },
  getUserByEmail(user_email) {
    return users.findOne({
      "email": user_email
    }).then((doc) => {
      console.log("doc", doc);
    })
  },
}
