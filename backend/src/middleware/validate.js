export const validate = (schema) => (req, res, next) => {
  try {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.error.errors[0].message,
      });
    }

    req.body = result.data;
    next();
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Invalid request data",
    });
  }
};



/*
    // JOI
    if (result?.error) {
      return res.status(400).json({
        success: false,
        message: result.error.details?.[0]?.message || "Validation error",
      });
    }
*/