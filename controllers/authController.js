import { registerUser, loginUser } from '../services/authService.js';

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide all fields' });
    }

    const data = await registerUser({ name, email, password });

    res.status(201).json({ message: 'User registered successfully', ...data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }
    
    const data = await loginUser({ email, password });

    res.status(200).json({ message: 'Login successful', ...data });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
