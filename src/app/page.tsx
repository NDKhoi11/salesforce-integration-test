import ContactTable from "@/client/components/ContactTable";
import { querySObjectRecords } from "@/server/apis/salesforce";
import { getQuerySObjectsQueryKey } from "@/shared/queryKey";
import { RQHydrate, queryClient } from "@/utils/react-query";

const Page: React.FC = async () => {
  const query =
    "SELECT+Id,FirstName,LastName,Email,Phone+FROM+Contact+LIMIT+10";
  await queryClient.prefetchQuery({
    queryKey: getQuerySObjectsQueryKey(query),
    queryFn: () => querySObjectRecords(query),
  });

  return (
    <RQHydrate>
      <ContactTable />
    </RQHydrate>
  );
};

export default Page;
