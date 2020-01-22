const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
  comment: String,
  video: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Video'
  }
})

commentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const VideoComment = mongoose.model('VideoComment', commentSchema)

module.exports = VideoComment