const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)

const ballroomSchema = mongoose.Schema({
  title: {
    type: String,
    minlength: 3,
    reguired: true
  },
  author: String,
  url: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'BallroomComment'
    }
  ]
})

ballroomSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Ballroom', ballroomSchema)