import { useQuery } from "@tanstack/react-query";
import { getCreditCards } from "./services/creditCard.api";
import {
  CreditCardTableHeader,
  CreditCardFirstHeaderLabel,
} from "./constants/creditCard.constants";
import { getValue } from "./services/utils";
import { CreditCard } from "./types/creditCardModel";

const Row = ({ creditCard }: { creditCard: CreditCard }) => {
  return (
    <tr key={creditCard.name} className="border-slate-400 border">
      <td className="sticky left-0 p-2 bg-slate-200">
        <figure className="w-[200px] h-[150px]">
          <img
            src={creditCard.image}
            alt={creditCard.name}
            className="h-full object-cover"
          />
        </figure>
        <span>{creditCard.name}</span>
      </td>
      {CreditCardTableHeader.map((header) => (
        <td className="border-slate-400 border-l p-0" key={header.key}>
          {getValue(header.key, creditCard)}
        </td>
      ))}
    </tr>
  );
};

export default function CreditCardTable() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["creditCard"],
    queryFn: getCreditCards,
  });

  if (isError) {
    return <span>Error loading data</span>;
  }

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <table className="table-fixed text-center bg-slate-200 border border-slate-400" role="grid">
      <thead className="border border-slate-400">
        <tr>
          <th className="w-[300px] min-w-[300px] sticky left-0 bg-slate-200 p-0" scope="col">
            {CreditCardFirstHeaderLabel}
          </th>
          {CreditCardTableHeader.map((header) => (
            <th
              className="w-[300px] min-w-[300px] border-slate-400 border-l p-0"
              key={header.key}
              scope="col"
            >
              {header.display}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data?.map((creditCard, index) => (
         <Row creditCard={creditCard} key={index} />
        ))}
      </tbody>
    </table>
  );
}
