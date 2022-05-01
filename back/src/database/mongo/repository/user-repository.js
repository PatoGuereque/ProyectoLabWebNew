import { User } from '../models/user';

const addGoogleUser = ({ id, email, firstName, lastName }) => {
  const user = new User({
    id,
    email,
    firstName,
    lastName,
    source: 'google',
  });
  return user.save();
};

const getUsers = () => User.find({});
const getUserByEmail = ({ email }) => User.findOne({ email });
const getUserById = ({ id }) => User.findOne({ id });

export { addGoogleUser, getUsers, getUserByEmail, getUserById };
