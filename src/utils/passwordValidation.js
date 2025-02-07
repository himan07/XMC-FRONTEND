export const passwordValidation = (watch) => ({
    required: "Password is required",
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?/\\|`~\-]).{8,20}$/,
      message: watch("password") ? "Please enter the valid Password" : "",
    },
  });