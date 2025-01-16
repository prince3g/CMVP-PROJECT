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

function App() {
  const location = useLocation(); // Now useLocation works as App is wrapped in Router

  // Check for specific paths to determine classes and footer visibility
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
  const isVerificationPage = location.pathname === '/verification';

  // Determine the class for Navbar
  const navbarClass = isAuthPage ? 'Reg_Nav' : isVerificationPage ? 'Verification_Nav' : '';

  return (
    <div className="App">
      <ScrollToTop />

      {/* Pass the determined class to Navbar */}
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
        </Routes>
      </div>

      {/* Conditionally hide Footer */}
      {!isAuthPage && !isVerificationPage && <Footer />}
    </div>
  );
}

export default App;
