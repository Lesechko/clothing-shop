import { Routes, Route } from "react-router-dom";
import SignIn from "./components/authentication/Authentication.component";

import Home from "./routes/home/Home.component";
import Navigation from "./routes/navigation/Navigation.component";
import Shop from "./components/shop/Shop.component"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="auth" element={<SignIn />} />
      </Route>
    </Routes>
  );
}
export default App;
