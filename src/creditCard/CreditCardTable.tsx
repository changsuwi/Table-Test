import { useQuery } from "@tanstack/react-query";
import { getCreditCards } from "./services/creditCard.api";
import {
  CreditCardTableHeader,
  CreditCardFirstHeaderLabel,
} from "./constants/creditCard.constants";
import { getValue } from "./services/utils";
import { VariableSizeList as List } from "react-window";
import { memo, useEffect, useRef } from "react";
import { CreditCard } from "./types/creditCard.model";

const Row = memo(
  ({
    index,
    style,
    creditCards,
    setRowHeight,
  }: {
    index: number;
    style: React.CSSProperties;
    creditCards: CreditCard[];
    setRowHeight: (index: number, size: number) => void;
  }) => {
    const rowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (rowRef.current) {
        setRowHeight(index, rowRef.current.clientHeight);
      }
      // eslint-disable-next-line
    }, [rowRef]);

    if (index === 0) {
      return (
        <div className="flex w-[1800px]" ref={rowRef}>
          <div
            className="w-[300px] sticky left-0 bg-slate-200 p-2 border-slate-400 border-b border-r"
            role="columnheader"
          >
            {CreditCardFirstHeaderLabel}
          </div>
          {CreditCardTableHeader.map((header) => (
            <div
              className="w-[300px] border-slate-400 border-r border-b p-2"
              key={header.key}
              role="columnheader"
            >
              {header.display}
            </div>
          ))}
        </div>
      );
    }

    if (!creditCards) {
      return null;
    }

    const creditCard = creditCards[index - 1];
    return (
      <div style={style}>
        <div className="flex w-[1800px]" ref={rowRef}>
          <div className="sticky left-0 p-2 bg-slate-200 flex flex-col items-center w-[300px] border-slate-400 border-b border-r">
            <figure className="w-[200px] h-[150px] min-w-[200px] min-h-[150px]">
              <img
                src={creditCard.image}
                alt={creditCard.name}
                className="h-full object-cover"
              />
            </figure>
            <span>{creditCard.name}</span>
          </div>
          {CreditCardTableHeader.map((header) => (
            <div
              className="border-slate-400 border-r border-b p-2 flex-1 w-[300px]"
              key={header.key}
            >
              {getValue(header.key, creditCard)}
            </div>
          ))}
        </div>
      </div>
    );
  }
);

export default function CreditCardTable() {
  const listRef = useRef<List>(null);
  const rowHeights = useRef<Record<number, number>>({});

  const {
    data: creditCards,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["creditCard"],
    queryFn: getCreditCards,
  });

  function getRowHeight(index: number) {
    return rowHeights.current[index] || 41;
  }

  function setRowHeight(index: number, size: number) {
    rowHeights.current = { ...rowHeights.current, [index]: size };
    if (listRef.current) {
      listRef.current.resetAfterIndex(index);
    }
  }

  if (isError) {
    return <span>Error loading data</span>;
  }

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <div className="bg-slate-200 border border-slate-400">
      {creditCards && (
        <List
          height={600}
          itemCount={creditCards.length + 1}
          itemSize={getRowHeight}
          width={"100%"}
          ref={listRef}
        >
          {({ index, style }) => (
            <Row
              index={index}
              style={style}
              creditCards={creditCards}
              setRowHeight={setRowHeight}
            />
          )}
        </List>
      )}
    </div>
  );
}
