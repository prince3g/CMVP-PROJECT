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
import Verification from './Components/Verification';
import ForgotPassPage from './Components/ForgotPassPage';
import ForgotPassPageReset from './Components/ForgotPassPageReset';

function App() {
  const location = useLocation();

  const isAuthPage =
    location.pathname === '/login' ||
    location.pathname === '/signup' ||
    location.pathname === '/forgot-password' ||
    location.pathname.startsWith('/forgotten_pass_reset/');
  const isVerificationPage =
    location.pathname.startsWith('/verification') && location.pathname.split('/').length >= 2;

  const navbarClass = isAuthPage ? 'Reg_Nav' : isVerificationPage ? 'Verification_Nav' : '';

  return (
    <div className="App">
      <ScrollToTop />
      <Navbar className={navbarClass} />
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
          <Route path="/verification" element={<Verification />} />
          <Route path="/verification/:orgID/:OrgName" element={<Verification />} />
          <Route path="/forgot-password" element={<ForgotPassPage />} />
          <Route path="/forgotten_pass_reset/:uidb64/:token/" element={<ForgotPassPageReset />} />
        </Routes>
      </div>
      {!isAuthPage && !isVerificationPage && <Footer />}
    </div>
  );
}

export default App;
