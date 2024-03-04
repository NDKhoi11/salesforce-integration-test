import { SALESFORCE_RESOURCE_API_URL } from "@/config/environments";
import axios from "axios";
import { getSession } from "next-auth/react";

const axiosInstance = axios.create({
  baseURL: SALESFORCE_RESOURCE_API_URL,
});

axiosInstance.interceptors.request.use(async (config) => {
  const session: any = await getSession();
  if (session) {
    config.headers.Authorization = `Bearer ${session.access_token}`;
  }

  return config;
});

export default axiosInstance;
