export const validate = (schema) => (req, res, next) => {
  try {
    const result = schema.safeParse
      ? schema.safeParse(req.body) // ZOD
      : schema.validate(req.body); // JOI

    // ZOD
    if (result?.success === false) {
      return res.status(400).json({
        message: result.error.errors[0].message,
      });
    }

    // JOI
    if (result?.error) {
      return res.status(400).json({
        message: result.error.details?.[0]?.message || "Validation error",
      });
    }

    next();
  } catch (err) {
    return res.status(400).json({
      message: "Invalid request data",
    });
  }
};
