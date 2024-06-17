import { useQuery } from "@tanstack/react-query";
import { getCreditCards } from "./services/creditCard.api";
import {
  CreditCardTableHeader,
  CreditCardFirstHeaderLabel,
  HeaderType,
} from "./constants/creditCard.constants";
import { getValue } from "./services/utils";
import { VariableSizeList as List } from "react-window";
import { memo, useEffect, useRef, useCallback } from "react";
import { CreditCard } from "./types/creditCard.model";
import clsx from "clsx";

const HeaderRow = memo(
  ({
    setRowHeight,
  }: {
    setRowHeight: (index: number, size: number) => void;
  }) => {
    const rowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (rowRef.current) {
        setRowHeight(0, rowRef.current.clientHeight);
      }
    }, [setRowHeight]);

    return (
      <div className="flex w-table-row" ref={rowRef} role="row">
        <div
          className="w-table-cell sticky left-0 bg-slate-200 p-2 border-slate-400 border-b border-r"
          role="columnheader"
          aria-label={CreditCardFirstHeaderLabel}
        >
          {CreditCardFirstHeaderLabel}
        </div>
        {CreditCardTableHeader.map((header) => (
          <div
            className={clsx(
              "w-table-cell border-slate-400 border-r border-b p-2",
              header.key === HeaderType.merchantSystem && "border-r-0"
            )}
            key={header.key}
            role="columnheader"
            aria-label={header.display}
          >
            {header.display}
          </div>
        ))}
      </div>
    );
  }
);

const DataRow = memo(
  ({
    index,
    style,
    creditCards,
    isLastRow,
    setRowHeight,
  }: {
    index: number;
    style: React.CSSProperties;
    creditCards: CreditCard[];
    isLastRow: boolean;
    setRowHeight: (index: number, size: number) => void;
  }) => {
    const rowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (rowRef.current) {
        setRowHeight(index, rowRef.current.clientHeight);
      }
    }, [index, setRowHeight]);

    if (!creditCards) {
      return null;
    }

    const creditCard = creditCards[index - 1];
    return (
      <div style={style} role="row">
        <div className="flex w-table-row" ref={rowRef}>
          <div
            className={clsx(
              "sticky left-0 p-2 bg-slate-200 flex flex-col items-center w-table-cell border-slate-400 border-b border-r",
              isLastRow && "border-b-0"
            )}
            role="cell"
          >
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
              className={clsx(
                "border-slate-400 border-r border-b p-2 flex-1 w-table-cell",
                header.key === HeaderType.merchantSystem && "border-r-0",
                isLastRow && "border-b-0"
              )}
              key={header.key}
              role="cell"
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
  } = useQuery<CreditCard[]>({
    queryKey: ["creditCard"],
    queryFn: getCreditCards,
  });

  const getRowHeight = useCallback((index: number) => {
    return rowHeights.current[index] || 41;
  }, []);

  const setRowHeight = useCallback((index: number, size: number) => {
    rowHeights.current = { ...rowHeights.current, [index]: size };
    if (listRef.current) {
      listRef.current.resetAfterIndex(index);
    }
  }, []);

  if (isError) {
    return <span className="text-red-500">Error loading data</span>;
  }

  if (isLoading) {
    return <span className="text-blue-500">Loading...</span>;
  }

  return (
    <div
      className="bg-slate-200 border border-slate-400"
      role="table"
      aria-label="Credit Card Table"
    >
      {creditCards && (
        <List
          height={600}
          itemCount={creditCards.length + 1}
          itemSize={getRowHeight}
          width={"100%"}
          ref={listRef}
        >
          {({ index, style }) => {
            if (index === 0) {
              return <HeaderRow setRowHeight={setRowHeight} />;
            }
            return (
              <DataRow
                index={index}
                style={style}
                creditCards={creditCards}
                setRowHeight={setRowHeight}
                isLastRow={index === creditCards.length}
              />
            );
          }}
        </List>
      )}
    </div>
  );
}
