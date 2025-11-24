import { createDashboardMetadata } from "@/utils/metadata";
import UnitKostPageContent from "./UnitKostPageContent";

export const metadata = createDashboardMetadata({
  subtitle: "Unit Kost",
  description: "Manage your kost units",
});

export default function UnitKostPage() {
  return <UnitKostPageContent />;
}