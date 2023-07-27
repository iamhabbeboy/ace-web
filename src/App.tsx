import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Error404Page from './pages/Error404Page';
import HomePage from './pages/HomePage';
import DashboardHomePage from './pages/dashboard/HomePage';
import AccountTypeSelectionPage from './pages/AccountTypeSelectionPage';
import NewExamProjectPage from './pages/dashboard/NewExamProjectPage';
import ExamOverviewPage from './pages/dashboard/ExamOverviewPage';
import Login from './pages/student/Login';
import Overview from './pages/student/Overview';
import Exam from './pages/student/Exam';
import SignInPage from './pages/SignIn';
import ProtectedRoute from './hooks/ProtectedRoute';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Error404Page />} />
          {/* Public Routes */}
          <Route index element={<HomePage />} />
          <Route path="/signin" element={<SignInPage />} />
          {/* Student Portal */}
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/onboarding/account" element={<AccountTypeSelectionPage />} />
            <Route path="/home" element={<DashboardHomePage />} />
            <Route path="/projects/new" element={<NewExamProjectPage />} />
            <Route path="/projects/:examId" element={<ExamOverviewPage />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/exam" element={<Exam />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>

  );
}

export default App;
