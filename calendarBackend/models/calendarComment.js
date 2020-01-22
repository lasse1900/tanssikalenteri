const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
  comment: String,
  calendar: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Calendar'
  }
})

commentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const CalendarComment = mongoose.model('CalendarComment', commentSchema)

module.exports = CalendarComment