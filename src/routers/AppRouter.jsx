import { Route, Routes } from "react-router-dom";
import routes from "../helpers/routes";
import LoginPage from "../pages/Authentication/LoginPage";
import RegisterPage from "../pages/Authentication/RegisterPage";
import FirstView from "../pages/BuyProcess/FirstView";
import OrderDetails from "../pages/BuyProcess/OrderDetails";
import OrderInformation from "../pages/BuyProcess/OrderInformation";
import OrderSuccessful from "../pages/BuyProcess/OrderSuccessful";
import Products from "../pages/BuyProcess/Products";
import Restaurants from "../pages/BuyProcess/Restaurants";
import Suppliers from "../pages/BuyProcess/Suppliers";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import PastRecord from "../pages/Record/PastRecord/PastRecord";
import PendingRecord from "../pages/Record/PendingRecord/PendingRecord";
import Reception from "../pages/Record/PendingRecord/Reception";
import Record from "../pages/Record/Record";
import AddRestaurants from "../pages/Settings/AddRestaurants";
import FAQ from "../pages/Settings/FAQ";
import Settings from "../pages/Settings/Settings";
import SettingsRestaurants from "../pages/Settings/SettingsRestaurants";
import SettingsSuppliers from "../pages/Settings/SettingsSuppliers";
import TermsAndConditions from "../pages/TermsAndConditions";
import ChatIntercom from "../pages/ChatIntercom";
import Chat from "../pages/Chat";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";

export default function AppRouter() {
  return (
    <Routes>
      <Route path={routes.landing} element={<HomePage />} exact />
      <Route exact path={routes.home} element={<PublicRoute />}>
        <Route path={routes.home} element={<HomePage />} exact />
      </Route>
      <Route exact path={routes.login} element={<PublicRoute />}>
        <Route exact path={routes.login} element={<LoginPage />} />
      </Route>
      <Route exact path={routes.register} element={<PublicRoute />}>
        <Route exact path={routes.register} element={<RegisterPage />} />
      </Route>
      <Route exact path={routes.tAndC} element={<PublicRoute />}>
        <Route exact path={routes.tAndC} element={<TermsAndConditions />} />
      </Route>
      <Route exact path={routes.chatIntercom} element={<PublicRoute />}>
        <Route exact path={routes.chatIntercom} element={<ChatIntercom />} />
      </Route>
      <Route exact path={routes.chat} element={<PublicRoute />}>
        <Route exact path={routes.chat} element={<Chat />} />
      </Route>

      <Route exact path={routes.firstView} element={<PrivateRoute />}>
        <Route path={routes.firstView} element={<FirstView />} />
      </Route>
      <Route exact path={routes.addRestaurants} element={<PrivateRoute />}>
        <Route path={routes.addRestaurants} element={<AddRestaurants />} />
      </Route>
      <Route exact path={routes.restaurants} element={<PrivateRoute />}>
        <Route path={routes.restaurants} element={<Restaurants />} />
      </Route>
      <Route exact path={routes.suppliers} element={<PrivateRoute />}>
        <Route path={routes.suppliers} element={<Suppliers />} />
        <Route exact path="products" element={<Products />} />
        <Route exact path="details" element={<OrderDetails />} />
        <Route exact path="orderInformation" element={<OrderInformation />} />
      </Route>
      <Route exact path={routes.orderSuccessful} element={<PrivateRoute />}>
        <Route path={routes.orderSuccessful} element={<OrderSuccessful />} />
      </Route>
      <Route exact path={routes.settings} element={<PrivateRoute />}>
        <Route exact path={routes.settings} element={<Settings />} />
        <Route exact path="faq" element={<FAQ />} />
        <Route
          exact
          path="termsAndCoditions"
          element={<TermsAndConditions />}
        />
        <Route exact path="editRestaurants" element={<SettingsRestaurants />} />
        <Route exact path="editSuppliers" element={<SettingsSuppliers />} />
      </Route>
      <Route exact path={routes.record} element={<PrivateRoute />}>
        <Route exact path={routes.record} element={<Record />} />
        <Route exact path="pendingRecord" element={<PendingRecord />}></Route>
        <Route exact path="pastRecord" element={<PastRecord />} />
        <Route exact path="reception/:id/:name/:quantity/:uom" element={<Reception />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
