import User from '../models/user.js';

/**
 * Get all users (admin use)
 */
const getAllUsers = async () => {
  const users = await User.find().select('-password'); // exclude password
  return users;
};

/**
 * Get user by ID
 */
const getUserById = async (id) => {
  const user = await User.findById(id).select('-password');
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

/**
 * Update user profile
 */
const updateUser = async (id, updates) => {
  const user = await User.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  }).select('-password');

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};

/**
 * Delete user
 */
const deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

export {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
