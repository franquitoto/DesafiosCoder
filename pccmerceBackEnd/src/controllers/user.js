import Logger from '../services/logger';
import { UserAPI} from '../api';
export const validateNewUser = (newUser) => {
  return (
    !newUser ||
    !newUser.firstName ||
    !newUser.lastName ||
    !newUser.age ||
    !newUser.address ||
    !newUser.address.street ||
    !newUser.address.city
  );
};

export const getUserByEmail = (email) => UserAPI.findByEmail(email);

export const createUser = async (userData) => {
  const newUser = await UserAPI.create(userData);
  await CartAPI.create(newUser._id);
  return newUser;
};
