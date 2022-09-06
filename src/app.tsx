import { useRoutes } from "react-router-dom";
import { ROUTER_CONFIG } from "./config/router";
import "./app.scss";

const App = () => {
    const appRoutersElement = useRoutes(ROUTER_CONFIG);
    return appRoutersElement;
};
export default App;
