import {
  SALESFORCE_API_VERSION,
  SALESFORCE_AUTH_API_URL,
  SALESFORCE_CLIENT_ID,
  SALESFORCE_CLIENT_SECRET,
  SALESFORCE_PASSWORD,
  SALESFORCE_RESOURCE_API_URL,
  SALESFORCE_SECURITY_TOKEN,
  SALESFORCE_USERNAME,
} from "@/config/environments";
import axios from "axios";

const getAccessToken = async () => {
  const formData = new FormData();
  formData.append('grant_type', 'password');
  formData.append('client_id', SALESFORCE_CLIENT_ID);
  formData.append('client_secret', SALESFORCE_CLIENT_SECRET);
  formData.append('username', SALESFORCE_USERNAME);
  formData.append('password', `${SALESFORCE_PASSWORD}${SALESFORCE_SECURITY_TOKEN}`);

  const result = await axios.post(
    `${SALESFORCE_AUTH_API_URL}/services/oauth2/token`,
    formData,
  );
  
  return result?.data?.access_token
}

export const querySObjectRecords = async (query: string) => {
  const accessToken = await getAccessToken()

  return fetch(
    `${SALESFORCE_RESOURCE_API_URL}/services/data/v${SALESFORCE_API_VERSION}/query/?q=${query}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  ).then((res) => res.json());
};

export const updateSObject = async (
  SObject: string,
  id: string,
  body?: Record<string, any>
) => {
  const accessToken = await getAccessToken()

  return axios.patch(
    `${SALESFORCE_RESOURCE_API_URL}/services/data/v${SALESFORCE_API_VERSION}/sobjects/${SObject}/${id}`,
    body,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
};
