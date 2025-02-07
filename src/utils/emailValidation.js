export const emailValidation = (watch) => ({
    required: "Email is required",
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      message: watch("email") ? "Please enter a valid email address" : "",
    },
  });