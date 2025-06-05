import AuthProvider from "./contexts/AuthProvider";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <>
      <h1>பெயர் செயலி</h1>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </>
  );
}

export default App;
