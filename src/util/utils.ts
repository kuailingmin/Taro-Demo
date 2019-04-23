
//手机号验证
export const isPoneAvailable = (phone) => {
   const myreg = /^[1][0-9][0-9]{9}$/;
   if (!myreg.test(phone)) {
    return false;
   }
  return true;
}