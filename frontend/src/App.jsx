import { BrowserRouter as Router } from "react-router-dom";
import "./App.scss";
import history from "./helpers/history";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <Router history={history}>
      <AppRoutes></AppRoutes>
    </Router>
  );
}

export default App;
