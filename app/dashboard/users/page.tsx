import { createDashboardMetadata } from "@/utils/metadata";
import UserManagementWrapper from "./user-management-wrapper";

export const metadata = createDashboardMetadata({
  subtitle: "Users",
  description: "Manage users",
});

export default function UsersPage() {
  return <UserManagementWrapper />;
}
