import Joi from 'joi';

/**
 * High-Order function that returns an Express middleware to validate request bodies against a Joi schema.
 * Input Validation is the primary defense against application logic exploits.
 */
export const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false, // Return all validation errors at once
      stripUnknown: true // Crucial: strips out unexpected fields to prevent Mass Assignment attacks
    });

    if (error) {
      const errorMessage = error.details.map((detail) => detail.message).join(', ');
      return res.status(400).json({ error: 'Validation Error', details: errorMessage });
    }

    next();
  };
};

/**
 * Example Schema implementation.
 * Used like: router.post('/route', validateRequest(routeSchema), createRouteController)
 */
export const routeSchema = Joi.object({
  origin: Joi.string().required().max(100),
  destination: Joi.string().required().max(100),
  coordinates: Joi.array().items(
    Joi.object({
      lat: Joi.number().min(-90).max(90).required(),
      lng: Joi.number().min(-180).max(180).required()
    })
  ).max(50), // Don't allow massive arrays (DoS prevention)
});
