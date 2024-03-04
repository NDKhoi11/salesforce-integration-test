import {
  SALESFORCE_API_VERSION,
  SALESFORCE_RESOURCE_API_URL,
} from "@/config/environments";
import { getNextAuthSessionToken } from "../common";

export const querySObjectRecords = async (query: string) => {
  const sessionToken = await getNextAuthSessionToken();

  const result = await fetch(
    `${SALESFORCE_RESOURCE_API_URL}/services/data/v${SALESFORCE_API_VERSION}/query/?q=${query}`,
    {
      headers: {
        Authorization: `Bearer ${sessionToken?.access_token}`,
      },
    }
  );

  const data = await result.json();

  if (result.ok) {
    return data;
  }

  throw new Error();
};
