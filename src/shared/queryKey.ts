import { SALESFORCE_API_VERSION } from "@/config/environments";

export const getQuerySObjectsQueryKey = (query?: string) => {
  return [
    `/services/data/v${SALESFORCE_API_VERSION}/query/`,
    ...(query ? [query] : []),
  ];
};
