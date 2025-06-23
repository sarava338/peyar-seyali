import { Outlet } from "react-router-dom";

import Header from "../components/header";
import Footer from "../components/Footer";

export default function PublicLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
