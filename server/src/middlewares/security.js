import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import helmet from 'helmet';
import cors from 'cors';

/**
 * Initializes all primary security middleware for the Express application.
 * 
 * 1. Helmet: Sets 14+ different HTTP headers (HSTS, NoSniff, XSS-Protection)
 * 2. CORS: Restricts cross-origin requests to trusted domains.
 * 3. Rate Limiter: Protects against Brute Force and DDoS.
 * 4. MongoSanitize: Prevents NoSQL Injection (replaces $ and . in payload keys).
 * 5. XSS: Removes malicious HTML/JS tags from user input.
 */
export const setupSecurityMiddleware = (app) => {
  // 1. HTTP Security Headers
  app.use(helmet());

  // 2. Cross-Origin Resource Sharing (CSRF Mitigation layer 1)
  app.use(cors({
    origin: process.env.ALLOWED_ORIGIN || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // Required if using HttpOnly cookies for JWT
  }));

  // 3. Rate Limiting (Basic DDoS / Brute Force Protection)
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window`
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many requests from this IP, please try again after 15 minutes' }
  });
  app.use('/api', limiter);

  // 4. Data Sanitization against NoSQL Query Injection
  // (Translates keys like {"$gt": ""} to prevent bypassing auth logic)
  app.use(mongoSanitize());

  // 5. Data Sanitization against XSS
  // Strips dangerous HTML tags from req.body, req.query, and req.params
  app.use(xss());
};
