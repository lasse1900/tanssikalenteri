const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)

const ballroomSchema= mongoose.Schema({
  title: String,
  author: String,
  url: String,
  important: Boolean,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

ballroomSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Ballroom', ballroomSchema)