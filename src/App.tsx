import CreditCardTable from "./creditCard/CreditCardTable";

export default function App() {
  return (
    <main className="flex w-screen h-screen ">
      <section className="flex flex-col gap-4 justify-center ">
        <h1 className="font-bold text-2xl px-4">Comparison Table</h1>
        <div className="mx-4 w-[calc(100vw-2rem)] max-w-[1800px] h-[600px] overflow-auto">
          <CreditCardTable />
        </div>
      </section>
    </main>
  );
}
