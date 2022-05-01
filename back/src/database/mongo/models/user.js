import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  id: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    required: [true, 'email required'],
    unique: [true, 'email already registered'],
  },
  firstName: String,
  lastName: String,
  profilePhoto: String,
  source: { type: String, required: [true, 'source not specified'] },
  lastVisited: { type: Date, default: new Date() },
});

export const User = mongoose.model('user', userSchema, 'user');
