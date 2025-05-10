import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppRouter from "./routes";
import { IncomeExpenseProvider } from "./context/IncomeExpenseContext";

const App = () => {
  return (
    <div className="App">
      <IncomeExpenseProvider>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </IncomeExpenseProvider>
    </div>
  );
};
export default App;
