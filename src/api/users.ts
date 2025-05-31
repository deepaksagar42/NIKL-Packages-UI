import axios from "axios";

const BASE_URL = "https://api.nikl-pkg.nekonik.com/users";

export const registerUser = async ({
  user_name,
  email,
  password,
  full_name,
  hcaptcha_token
}: {
  user_name: string;
  email: string;
  password: string;
  full_name: string;
  hcaptcha_token: string;
}): Promise<any> => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, {
      user_name,
      email,
      password: btoa(password), // base64-encode
      full_name,
      hcaptcha_token,
    }, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 201) {
      console.log("Registration successful:", response.data);
      return response.data;
    } else {
      throw new Error("Unexpected response status: " + response.status);
    }

  } catch (error: any) {
    const errMsg = error.response?.data?.message || error.message;
    console.error("Registration failed:", errMsg);
    throw new Error(errMsg);
  }
};
