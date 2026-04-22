import ClientPage from "@/composants/ClientPage";

export default async function Home() {
  const res = await fetch("http://localhost:3000/yields", {
    cache: "no-store",
  });

  const data = await res.json();

  return <ClientPage data={data} />;
}