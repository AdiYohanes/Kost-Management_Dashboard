import { createDashboardMetadata } from "@/utils/metadata";
import DashboardClientWrapper from "./DashboardClientWrapper";

export const metadata = createDashboardMetadata({
  subtitle: "Analytics",
  description: "Analytics Dashboard",
});

export default function DashboardPage() {
  return <DashboardClientWrapper initialSelectedKost="kost1" />;
}
