import ContactTable from "@/components/ContactTable";
import { querySObjectRecords } from "@/services/salesforce.service";

const Page: React.FC = async () => {
  const contactData = await querySObjectRecords(
    "SELECT+Id,FirstName,LastName,Email,Phone+FROM+Contact+LIMIT+10"
  );

  return <ContactTable items={contactData?.records || []} />;
};

export default Page;
