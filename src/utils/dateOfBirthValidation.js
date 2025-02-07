export const dobValidation = () => ({
  required: "Date of Birth is required",
  validate: (value) => {
    const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d\d$/;

    if (!regex.test(value)) {
      return "Invalid date format. Please use DD/MM/YYYY";
    }

    const [day, month, year] = value.split("/").map(Number);
    const dobDate = new Date(year, month - 1, day);
    const today = new Date();
    const age = calculateAge(dobDate);

    switch (true) {
      case age < 18:
        return "You must be at least 18 years old";
      case dobDate > today:
        return "Date of Birth cannot be in the future";
      default:
        return true;
    }
  },
});

const calculateAge = (dob) => {
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const month = today.getMonth();
  if (
    month < dob.getMonth() ||
    (month === dob.getMonth() && today.getDate() < dob.getDate())
  ) {
    age--;
  }
  return age;
};
