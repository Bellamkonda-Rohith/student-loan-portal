import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomeScreen from '../components/WelcomeScreen';
import LoanTypeSelection from '../components/LoanTypeSelection';
import GraduationLoanCriteria from '../Eligiblitycriteria/GraduationLoanCriteria';
import ForeignStudiesCriteria from '../Eligiblitycriteria/ForeignStudiesCriteria';
import RDLoanCriteria from '../Eligiblitycriteria/RDLoanCriteria';
import PersonalProfile from '../components/PersonalProfile';
import EducationalProfile from '../components/EducationalProfile';
import FinancialProfile from '../components/FinancialProfile';
import DecisionScreen from '../components/DecisionScreen';
import AdminDashboard from '../components/AdminDashboard';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
function Routing() {
  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/WelcomeScreen" element={<WelcomeScreen />} />

        <Route path="/LoanTypeSelection" element={<LoanTypeSelection />} />
        <Route path="/GraduationLoanCriteria" element={<GraduationLoanCriteria />} />
        <Route path="/ForeignStudiesCriteria" element={<ForeignStudiesCriteria />} />
        <Route path="/RDLoanCriteria" element={<RDLoanCriteria />} />
        <Route path="/PersonalProfile/:loanType" element={<PersonalProfile />} />
        <Route path="/EducationalProfile" element={<EducationalProfile />} />
        <Route path="/FinancialProfile" element={<FinancialProfile />} />
        <Route path="/DecisionScreen" element={<DecisionScreen />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default Routing;
