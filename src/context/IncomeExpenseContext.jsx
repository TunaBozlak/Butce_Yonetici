import React, { createContext, useState } from "react";

export const IncomeExpenseContext = createContext();

export const IncomeExpenseProvider = ({ children }) => {
  const [gelirGiderListesi, setGelirGiderListesi] = useState([
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

  const addGelirGider = (yeniKayit) => {
    setGelirGiderListesi([
      ...gelirGiderListesi,
      { ...yeniKayit, id: Date.now().toString() },
    ]);
  };

  const updateGelirGider = (id, guncellenmisKayit) => {
    setGelirGiderListesi(
      gelirGiderListesi.map((kayit) =>
        kayit.id === id ? { ...kayit, ...guncellenmisKayit } : kayit
      )
    );
  };

  const deleteGelirGider = (id) => {
    setGelirGiderListesi(gelirGiderListesi.filter((kayit) => kayit.id !== id));
  };

  return (
    <IncomeExpenseContext.Provider
      value={{
        gelirGiderListesi,
        addGelirGider,
        updateGelirGider,
        deleteGelirGider,
      }}
    >
      {children}
    </IncomeExpenseContext.Provider>
  );
};
