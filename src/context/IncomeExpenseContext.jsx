import { createContext, useEffect, useState } from "react";

export const IncomeExpenseContext = createContext();

export const IncomeExpenseProvider = ({ children }) => {
  const [incomeExpenseList, setIncomeExpenseList] = useState([]);
  const mail = localStorage.getItem("mail");
  console.log(mail);
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://v1.nocodeapi.com/tunabozlak37/google_sheets/erDdRuTCbOPSqGHP?tabId=budget"
      );
      const result = await response.json();
      const data = result.data;

      const filteredData = data.filter((item) => item.mail === mail);

      const mappedData = filteredData.map((item, index) => ({
        id: item.row_id.toString(),
        mail: item.mail,
        category: item.category,
        date: item.date,
        amount: Number(item.amount),
        type: item.type,
        description: item.description || "",
      }));

      setIncomeExpenseList(mappedData);
    } catch (error) {
      console.error("Veri çekme hatası:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
