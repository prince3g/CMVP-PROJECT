import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import ScrollToTop from './assets/ScrollToTop';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import HomePage from './Components/HomePage';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Terms from './Components/Terms';
import Privacy from './Components/Privacy';
import Contact from './Components/Contact';
import Pricing from './Components/Pricing';
import HowItWorks from './Components/HowItWorks';
import FAQ from './Components/FAQ';
import AboutUs from './Components/AboutUs';
import Verification from './Components/Verification';
import ForgotPassPage from './Components/ForgotPassPage';
import ForgotPassPageReset from './Components/ForgotPassPageReset';
import CompanyDashbaord from './Components/CompanyDashboard/CompanyDashbaord';
import AdminDashbaord from './Components/AdminDashboard/AdminDashboard';


function App() {
  const location = useLocation();

  const isAuthPage =
    location.pathname === '/login' ||
    location.pathname === '/signup' ||
    location.pathname === '/forgot-password' ||
    location.pathname.startsWith('/forgotten_pass_reset/');
  
  const isVerificationPage =
    location.pathname.startsWith('/verification') && location.pathname.split('/').length >= 2;
  
  const isDashboardPage = location.pathname.startsWith('/dashboard');
  const isAdminDashboardPage = location.pathname.startsWith('/admin-dashboard');

  const navbarClass = isAuthPage
    ? 'Reg_Nav'
    : isVerificationPage
    ? 'Verification_Nav'
    : isDashboardPage || isAdminDashboardPage
    ? ''
    : '';

  return (
    <div className="App">
      <ScrollToTop />
      {!isDashboardPage && !isAdminDashboardPage && <Navbar className={navbarClass} />}
      <div className="App-Pages">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/terms-of-use" element={<Terms />} />
          <Route path="/privacy-policy" element={<Privacy />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/about-cmvp" element={<AboutUs />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/verification/:orgID/:OrgName" element={<Verification />} />
          <Route path="/forgot-password" element={<ForgotPassPage />} />
          <Route path="/forgotten_pass_reset/:uidb64/:token/" element={<ForgotPassPageReset />} />
          <Route path="/dashboard/*" element={<CompanyDashbaord />} />
          <Route path="/admin-dashboard/*" element={<AdminDashbaord />} />
        </Routes>
      </div>
      {!isAuthPage && !isVerificationPage && !isDashboardPage && !isAdminDashboardPage && <Footer />}
    </div>
  );
}

export default App;
