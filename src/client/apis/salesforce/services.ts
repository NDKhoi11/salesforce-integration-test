import { SALESFORCE_API_VERSION } from "@/config/environments";
import axiosInstance from "@/utils/axios";
import { SObjectResponse, UpdateSObjectParams } from "./types";

export const querySObjectRecords = async <T>(
  query: string
): Promise<SObjectResponse<T>> => {
  const { data } = await axiosInstance.get(
    `/services/data/v${SALESFORCE_API_VERSION}/query/?q=${query}`
  );
  return data;
};

export const updateSObjectRecords = ({
  objectName,
  id,
  payload,
}: UpdateSObjectParams): Promise<void> => {
  return axiosInstance.patch(
    `services/data/v${SALESFORCE_API_VERSION}/sobjects/${objectName}/${id}`,
    payload
  );
};
