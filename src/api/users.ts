import axios from "axios";
import { useAtomValue } from 'jotai';
import { csrfToken } from "../state/Auth";

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


export const loginUser = async ({
  user_name,
  password,
  hcaptcha_token,
}: {
  user_name: string;
  password: string;
  hcaptcha_token: string;
}): Promise<any> => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, {
      user_name,
      password: btoa(password), // base64-encode
      hcaptcha_token,
    }, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    if (response.status === 200) {
      console.log("Login successful:", response.data);
      return response.headers;
    } else {
      throw new Error("Unexpected response status: " + response.status);
    }

  } catch (error: any) {
    const errMsg = error.response?.data?.message || error.message;
    console.error("Login failed:", errMsg);
    throw new Error(errMsg);
  }
}


export const logoutUser = async (csrfTokenValue: string): Promise<any> => {
  try {
    const response = await axios.delete(`${BASE_URL}/logout`, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfTokenValue, // Include CSRF token in the headers
      },
      withCredentials: true,
    });

    if (response.status === 200) {
      console.log("Logout successful:", response.data);
      return response.data;
    } else {
      throw new Error("Unexpected response status: " + response.status);
    }

  } catch (error: any) {
    const errMsg = error.response?.data?.message || error.message;
    console.error("Logout failed:", errMsg);
    throw new Error(errMsg);
  }
}


export const validateUserSession = async (): Promise<any> => {
  const csrfTokenValue = useAtomValue(csrfToken);
  try {
    const response = await axios.get(`${BASE_URL}/validate-session`, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfTokenValue,
      },
      withCredentials: true, // Ensure cookies are sent
    });
    if (response.status === 200) {
      console.log("Session validation successful:", response.data);
      return response.data;
    }
    throw new Error("Unexpected response status: " + response.status);
  } catch (error: any) {
    const errMsg = error.response?.data?.message || error.message;
    console.error("Session validation failed:", errMsg);
    throw new Error(errMsg);
  }
};


export const getUserDetails = async (csrfTokenValue: string): Promise<any> => {
  try {
    console.log("Fetching user details with CSRF token:", csrfTokenValue);
    if (!csrfTokenValue) {
      throw new Error("CSRF token is required for fetching user details.");
    }

    const response = await axios.get(`${BASE_URL}/profile`, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfTokenValue,
      },
      withCredentials: true, // Ensure cookies are sent
    });
    if (response.status === 200) {
      console.log("Session validation successful:", response.data);
      return response.data;
    }
    throw new Error("Unexpected response status: " + response.status);
  } catch (error: any) {
    const errMsg = error.response?.data?.message || error.message;
    console.error("Session validation failed:", errMsg);
    throw new Error(errMsg);
  }
};

export const updateUserDetails = async ({
  email,
  password,
  full_name,
  csrfTokenValue,
}: {
  email?: string;
  password?: string;
  full_name?: string;
  csrfTokenValue: string;
}): Promise<any> => {
  try {
    console.log("Updating user details with CSRF token:", csrfTokenValue);
    if (!csrfTokenValue) {
      throw new Error("CSRF token is required for updating user details.");
    }

    // Only include fields that are provided
    const body: Record<string, any> = {};
    if (email !== undefined) body.email = email;
    if (password !== undefined && password !== "")
      body.password = btoa(password);
    if (full_name !== undefined) body.full_name = full_name;

    const response = await axios.put(`${BASE_URL}/profile`, body, {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRF-Token": csrfTokenValue,
      },
      withCredentials: true,
    });

    if (response.status === 200) {
      console.log("User details updated successfully:", response.data);
      return response.data;
    } else {
      throw new Error("Unexpected response status: " + response.status);
    }
  } catch (error: any) {
    const errMsg = error.response?.data?.message || error.message;
    console.error("User details update failed:", errMsg);
    throw new Error(errMsg);
  }
};