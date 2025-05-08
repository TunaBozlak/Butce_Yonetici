import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppRouter from "./routes";
import { IncomeExpenseProvider } from "./context/IncomeExpenseContext";

const App = () => {
  return (
    <div className="App">
      <IncomeExpenseProvider>
        <BrowserRouter>
          <div className="flex flex-col">
            <AppRouter />
          </div>
        </BrowserRouter>
      </IncomeExpenseProvider>
    </div>
  );
};
export default App;
