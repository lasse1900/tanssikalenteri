const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)

const calendarSchema= mongoose.Schema({
  title: {
    type: String,
    minlength: 3,
    reguired: true
  },
  author: String,
  url: String,
  date: Date,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CalendarComment'
    }
  ]
})

calendarSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Calendar', calendarSchema)