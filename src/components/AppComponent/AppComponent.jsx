import { BrowserRouter, Route, Routes } from "react-router-dom";
import BasePage from "../BasePage/BasePage";
import Home from "../HomeComponent/HomeComponent";
import Users from "../UsersComponent/UserComponent";
import UserPage from "../UserPage/UserPage";
import UserInfo from "../UserInfo/UserInfo";
import UserCarts from "../UserCarts/UserCarts";
import NotFound from "../404/404";

function AppComponent() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BasePage />}>
          <Route index element={<Home />}></Route>
          <Route path="/users" element={<Users />}></Route>
          <Route path="users/:id" element={<UserPage />}>
            <Route index element={<UserInfo />} />
            <Route path="carts" element={<UserCarts />} />
          </Route>
          <Route path="*" element={<NotFound />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppComponent;
