import mongoose, { Schema } from 'mongoose';

const foundObjectSchema = new Schema({
  campus: String,
  location: String,
  category: String,
  reportingUser: String,
  imageBase64: String,
  status: String,
  dateFound: Date,
});

export const FoundObject = mongoose.model('FoundObject', foundObjectSchema);
