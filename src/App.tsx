import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import Header from "./components/Header";
import AppRouter from "./routes/AppRouter";

import { store, persistor } from "./store";
import { BrowserRouter } from "react-router-dom";

export default function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <Header />
            <AppRouter />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </>
  );
}
