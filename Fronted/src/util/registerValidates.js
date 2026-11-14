const registerValidates = (formData) => {

  let newError = {}

  if (!formData.name || formData.name.trim().length < 3) {
    newError.name = "Name must contain at least 3 characters"
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!formData.email || !emailPattern.test(formData.email)) {
    newError.email =  "Please enter a valid email"
  }

  const phonePattern = /^[0-9]{10}$/;

  if (!formData.phone || !phonePattern.test(formData.phone)) {
    newError.phone =  "Phone number must contain 10 digits"
  }

  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!formData.password || !passwordPattern.test(formData.password)) {
    newError.password =  "Password must contain uppercase, lowercase, number and special character"
  }

  if (formData.password !== formData.confirmPassword) {
    newError.confirmPassword = "Password and Confirm Password do not match"
  }

  return newError;
};
export default registerValidates;