import ClientPage from "@/composants/ClientPage";
import { getYields } from "@/lib/yields";

export default async function Home() {
  const data = await getYields();

  return <ClientPage data={data} />;
}
