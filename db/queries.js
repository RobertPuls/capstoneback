const db = require('./index');

const beats = db.get('beats');

module.exports = {
  getAllBeats() {
    console.log('queries');
    return beats.find({});
  },
  create(beat) {
    return beats.insert(beat);
  }
}
