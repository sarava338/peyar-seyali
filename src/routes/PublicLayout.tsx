import { Outlet } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import Header from "../components/header";
import Footer from "../components/Footer";

export default function PublicLayout() {
  return (
    <>
      <Helmet>
        <title>பெயர்கள்</title>
      </Helmet>

      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
