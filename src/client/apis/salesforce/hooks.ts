import { getQuerySObjectsQueryKey } from "@/shared/queryKey";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { querySObjectRecords, updateSObjectRecords } from "./services";
import { UpdateSObjectParams } from "./types";

export const useQuerySObjects = <T>(query: string) => {
  return useQuery({
    queryKey: getQuerySObjectsQueryKey(query),
    queryFn: () => querySObjectRecords<T>(query),
  });
};

export const useUpdateQuerySObjects = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: UpdateSObjectParams) =>
      updateSObjectRecords(params).then(() =>
        queryClient.invalidateQueries({ queryKey: getQuerySObjectsQueryKey() })
      ),
  });
};
