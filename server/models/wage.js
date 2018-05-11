const mongoose = require('mongoose')
const Schema = mongoose.Schema

const WageSchema = new Schema({
  eid: String,
  name: String,
  "2016": Array,
  "2017": Array,
  "2018": Array
})

const Wage = mongoose.model('wage', WageSchema)
module.exports = Wage
