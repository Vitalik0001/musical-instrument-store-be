import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const registerUser = async ({ username, email, password }) => {
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('Користувач вже існує');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Generate JWT
    const token = generateToken(user._id);
    console.log("token:", token);
    

    return { user: { id: user._id, username: user.username, email: user.email }, token };
  } catch (error) {
    throw new Error(error.message);
  }
};

const loginUser = async ({ username, password }) => {
  try {
    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error('Неправильна адреса електронної пошти або парольInvalid email or password');
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Неправильне ім\'я користувача або пароль');
    }

    // Generate JWT
    const token = generateToken(user._id);
    
    return { user: { id: user._id, username: user.username, email: user.email }, token };
  } catch (error) {
    throw new Error(error.message);
  }
};

export { registerUser, loginUser };
