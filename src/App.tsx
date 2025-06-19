import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

import AppRouter from "./routes/AppRouter";

import { store, persistor } from "./store";

import Header from "./components/header";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <Header />
            <AppRouter />
            <Footer />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </>
  );
}
