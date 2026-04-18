import jwt from 'jsonwebtoken';

/**
 * Middleware to verify JSON Web Tokens securely.
 * Protects routes from unauthorized access.
 */
export const verifyJWT = (req, res, next) => {
  let token;

  // Prioritize Authorization Header (Bearer Token format)
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } 
  // Alternatively, check for HttpOnly cookie (which acts as robust CSRF defense if SameSite=Strict)
  else if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return res.status(401).json({ error: 'Access Denied. No token provided.' });
  }

  try {
    // Verify token cryptographically
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach decoded user payload to request
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired. Please login again.' });
    }
    return res.status(403).json({ error: 'Invalid token.' });
  }
};
