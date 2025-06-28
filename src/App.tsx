import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "@mui/material";
import { HelmetProvider } from "react-helmet-async";

import AppRouter from "./routes/AppRouter";

import { store, persistor } from "./store";

import theme from "./theme";

export default function App() {
  return (
    <>
      <HelmetProvider>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <BrowserRouter>
                <AppRouter />
              </BrowserRouter>
            </PersistGate>
          </Provider>
        </ThemeProvider>
      </HelmetProvider>
    </>
  );
}
