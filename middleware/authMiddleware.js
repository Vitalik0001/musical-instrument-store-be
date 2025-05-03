import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const protect = async (req, res, next) => {
  let token = req.headers.authorization?.split(' ')[0];  

  if (!token) {
    return res.status(401).json({ message: 'Не авторизований, немає токена' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (error) {
    res.status(401).json({ message: 'Помилка токена, неавторизований' });
  }
};
