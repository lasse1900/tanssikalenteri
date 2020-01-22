const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
  comment: String,
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School'
  }
})

commentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const SchoolComment = mongoose.model('SchoolComment', commentSchema)

module.exports = SchoolComment