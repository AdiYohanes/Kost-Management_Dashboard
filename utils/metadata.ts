import { Metadata } from "next";

interface MetadataProps {
  subtitle?: string; // Boleh kosong
  description?: string; // Boleh kosong (nanti pakai default)
  asPath?: boolean; // Opsi tambahan misal mau format "Subtitle | Base" atau "Base | Subtitle"
}

export function createDashboardMetadata({
  subtitle,
  description,
}: MetadataProps = {}): Metadata {
  const baseTitle = "Dashboard";
  const title = subtitle ? `${baseTitle} | ${subtitle}` : baseTitle;

  return {
    title,
    description: description || "Admin Dashboard Page",

    openGraph: {
      title,
      description: description || "Admin Dashboard Page",
      type: "website",
    },
  };
}
