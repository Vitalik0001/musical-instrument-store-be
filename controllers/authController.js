import { registerUser, loginUser } from '../services/authService.js';

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Будь ласка, заповніть усі поля' });
    }

    const data = await registerUser({ username, email, password });

    res.status(201).json({ message: 'Користувач успішно зареєстрований', ...data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Будь ласка, введіть ім\'я користувача та пароль' });
    }
    
    const data = await loginUser({ username, password });

    res.status(200).json({ message: 'Успішний вхід в систему', ...data });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
