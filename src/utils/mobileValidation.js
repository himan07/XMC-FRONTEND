export const mobileValidation = (watch) => ({
    required: "Mobile Number is required",
    pattern: {
      value: /^(?:\+?\d{1,3})?[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,4}$/,
      message: watch("mobile") ? "Please enter the valid Mobile Number" : "",
    },
  });