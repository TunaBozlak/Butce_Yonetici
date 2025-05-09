import { createContext, useState } from "react";

export const IncomeExpenseContext = createContext();

export const IncomeExpenseProvider = ({ children }) => {
  const [incomeExpenseList, setIncomeExpenseList] = useState([
    {
      id: "1",
      category: "Kira",
      amount: 10000,
      type: "Gider",
      date: "2025-05-01",
      description: "merhaba",
    },
    {
      id: "2",
      category: "Market",
      amount: 5000,
      type: "Gider",
      date: "2025-05-05",
    },
    {
      id: "3",
      category: "Fatura",
      amount: 5000,
      type: "Gider",
      date: "2025-05-10",
    },
    {
      id: "4",
      category: "Maaş",
      amount: 20000,
      type: "Gelir",
      date: "2025-05-15",
    },
    {
      id: "5",
      category: "Serbest Meslek",
      amount: 15000,
      type: "Gelir",
      date: "2025-05-20",
    },
    {
      id: "6",
      category: "Yatırım",
      amount: 15000,
      type: "Gelir",
      date: "2025-05-25",
    },
    {
      id: "7",
      category: "Hediye",
      amount: 15000,
      type: "Gelir",
      date: "2025-05-30",
    },
    {
      id: "8",
      category: "Maaş",
      amount: 15000,
      type: "Gelir",
      date: "2025-06-01",
    },
  ]);

  const addIncomeExpense = (newRecord) => {
    setIncomeExpenseList([
      ...incomeExpenseList,
      { ...newRecord, id: Date.now().toString() },
    ]);
  };

  const updateIncomeExpense = (id, updatedRecord) => {
    setIncomeExpenseList(
      incomeExpenseList.map((record) =>
        record.id === id ? { ...record, ...updatedRecord } : record
      )
    );
  };

  const deleteIncomeExpense = (id) => {
    setIncomeExpenseList(
      incomeExpenseList.filter((record) => record.id !== id)
    );
  };

  return (
    <IncomeExpenseContext.Provider
      value={{
        incomeExpenseList,
        addIncomeExpense,
        updateIncomeExpense,
        deleteIncomeExpense,
      }}
    >
      {children}
    </IncomeExpenseContext.Provider>
  );
};
