const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
  username: {
    type: String,
    minlength: 5,
    required: true,
    unique: true
  },
  name: {
    type: String,
    minlength: 5,
    required: true
  },
  passwordHash: String,
  ballrooms: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ballroom'
    }
  ],
  schools: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'School'
    }
  ],
  videos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Video'
    }
  ],
  calendars: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Calendar'
    }
  ]
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User