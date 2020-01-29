const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
  comment: String,
  ballroom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ballroom'
  }
})

commentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const BallroomComment = mongoose.model('BallroomComment', commentSchema)

module.exports = BallroomComment