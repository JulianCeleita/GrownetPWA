import { BrowserRouter as Router } from "react-router-dom";
import AuthProvider from "./auth/AuthProvider";
import Layout from "./Layout";
import AppRouter from "./routers/AppRouter";
import { I18nextProvider } from "react-i18next";
import i18n from "./translations/i18n";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Layout>
            <I18nextProvider i18n={i18n}>
            <AppRouter />
            </I18nextProvider>
          </Layout>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
