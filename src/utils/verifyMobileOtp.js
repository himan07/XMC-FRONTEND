import axios from 'axios';

export const verifyMobileOtp = async (phoneNumber, otpCode) => {
  if (!phoneNumber || !otpCode) {
    console.error("Phone number and OTP code are required.");
    return { data: { status: 0, message: "Phone number and OTP code are required" } };
  }

  const VERIFY_CONFIG = {
    username: "Xcelotp",
    password: "!P3Bg*1s",
  };

  try {
    const queryParams = new URLSearchParams({
      username: VERIFY_CONFIG.username,
      password: VERIFY_CONFIG.password,
      msisdn: String(phoneNumber),
      otp: otpCode
    }).toString();
    
    const response = await axios.get(`/api/OtpApi/checkotp?${queryParams}`);
    console.log('OTP API Response:', response);
    console.log('OTP API Response Status:', response.data);
    return response;
  } catch (error) {
    console.error("Error verifying OTP:", error.message || error);
    return {
      data: {
        status: 0,
        message: error.response?.data?.message || "OTP verification failed"
      }
    };
  }
};
