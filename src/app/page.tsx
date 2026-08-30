import AppShellLoader from "@/components/AppShellLoader";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab } = await searchParams;
  const parsedTab = Number(tab);
  const activeTab = Number.isInteger(parsedTab) && parsedTab >= 0 ? parsedTab : 0;

  return <AppShellLoader tab={activeTab} />;
}
