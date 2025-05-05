import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppRouter from "./routes";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="flex flex-col">
          <AppRouter />
        </div>
      </BrowserRouter>
    </div>
  );
};
export default App;
