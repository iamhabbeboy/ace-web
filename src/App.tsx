import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Error404Page from './pages/Error404Page';
import HomePage from './pages/HomePage';
import  DashboardHomePage from './pages/dashboard/HomePage';
import AccountTypeSelectionPage from './pages/AccountTypeSelectionPage';
import NewExamProjectPage from './pages/dashboard/NewExamProject';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/onboarding/account-type" element={<AccountTypeSelectionPage />} />
          <Route path="/home" element={<DashboardHomePage />} />
          <Route path="/exams/new" element={<NewExamProjectPage />} />
          <Route path="*" element={<Error404Page />} />
        </Routes>
      </BrowserRouter>
    </>

  );
}

export default App;
