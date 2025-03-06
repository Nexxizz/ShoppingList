import {AppRoutes} from "./AppRoutes";
import {BrowserRouter} from "react-router-dom";
import {Navigation} from "./pages/Nav.tsx";

export const App = () => {
  return (
        <BrowserRouter>
          <Navigation />
          <AppRoutes />
        </BrowserRouter>
  )
}
