import { createDashboardMetadata } from "@/utils/metadata";
import LaundryManagementWrapper from "./laundry-management-wrapper";

export const metadata = createDashboardMetadata({
  subtitle: "Laundry",
  description: "Manage laundry services",
});

export default function LaundryPage() {
  return <LaundryManagementWrapper />;
}