import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ErrorBoundary } from "react-error-boundary";

import { ThemeProvider } from "@mui/material";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "./store";

import AppRouter from "./routes/AppRouter";

import theme from "./theme";
import Error from "./pages/Error";

export default function App() {
  return (
    <>
      <ErrorBoundary fallback={<Error code={500} messege="Something went Wrong. Check the logs" />}>
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
      </ErrorBoundary>
    </>
  );
}
