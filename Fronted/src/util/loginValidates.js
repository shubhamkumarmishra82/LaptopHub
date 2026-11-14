const loginValidates = (FormData) =>{
  let newError = {}
  if(!FormData.email){
    newError.email = "email field can not be empty"
  }
 if(!FormData.password){
    newError.password = "passwords field can be empty"
  }
  return newError;
  
}
export default loginValidates;