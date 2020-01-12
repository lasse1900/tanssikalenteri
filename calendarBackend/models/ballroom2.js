const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)

const ballroomSchema2= mongoose.Schema({
  title: String,
  author: String,
  url: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ]
})

ballroomSchema2.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Danceschool', ballroomSchema2)