import { useEffect, lazy, Suspense } from "react";
import { useDispatch } from "react-redux";

import { Routes, Route } from "react-router-dom";
import Spinner from "./components/spinner/spinner.component";
import { checkUserSession } from "./store/user/user.action";

const Home = lazy(() => import("./routes/home/home.component"))
const Authentication = lazy(() => import( "./routes/authentication/authentication.component"))
const Navigation = lazy(() => import("./routes/navigation/navigation.component"))
const Shop = lazy(() => import("./routes/shop/shop.component"))
const CheckOut = lazy(() => import("./routes/check-out/check-out.component"))

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkUserSession())
  }, [dispatch]);

  return (
    <Suspense fallback={<Spinner/>}>
    <Routes>
      <Route path="/" element={<Navigation />}>
        {/* Here we have our navigation bar and all routes underneath are children of this route '/' */}
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<CheckOut />} />
      </Route>
    </Routes>
    </Suspense>
  );
};

export default App;
