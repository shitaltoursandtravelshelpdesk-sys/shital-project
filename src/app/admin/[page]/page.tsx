import { notFound } from "next/navigation";
import { Shell } from "@/components/admin/Shell";
import { AdminScreen } from "@/components/admin/pages";
import { ALL_PAGES } from "@/components/admin/nav";

export function generateStaticParams() {
  return ALL_PAGES.map((page) => ({ page }));
}
export const dynamicParams = false;

export default async function AdminPage({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;
  if (!ALL_PAGES.includes(page)) notFound();
  return (
    <Shell page={page}>
      <AdminScreen page={page} />
    </Shell>
  );
}
