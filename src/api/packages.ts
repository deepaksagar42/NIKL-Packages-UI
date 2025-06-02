import axios from "axios";
import { useAtomValue } from 'jotai';
import { csrfToken } from "../state/Auth";

const BASE_URL = "https://api.nikl-pkg.nekonik.com/users";

import type { Dependency } from './types';

export const fetchPackageDependencies = async (packageId: string, version: string): Promise<Dependency[]> => {
  // TODO: Replace with actual API call
  console.log(`Fetching dependencies for package ${packageId} version ${version}`);

  return [
    {
      name: "proc-macro2",
      version: "1.0.91",
      description: "A substitute implementation of the compiler's `proc_macro` API to decouple token-based libraries from the procedural macro use case.",
      features: ["NO DEFAULT FEATURES"]
    },
    {
      name: "unicode-ident",
      version: "1.0",
      description: "Determine whether characters have the XID_Start or XID_Continue properties according to Unicode Standard Annex #31"
    },
    {
      name: "quote",
      version: "1.0.35",
      description: "Quasi-quoting macro quote!(...)",
      isOptional: true,
      features: ["OPTIONAL", "NO DEFAULT FEATURES"]
    }
  ];
};


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
