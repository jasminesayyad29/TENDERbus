import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; // Import the Footer

// Import all components
import LandingPage from './components/LandingPage';
import RegistrationPage from './components/RegistrationPage';
import LoginPage from './components/LoginPage';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import BidderDashboard from './components/Dashboard/BidderDashboard';
import UserProfilePage from './components/UserProfilePage';
import CreateTenderPage from './components/Tender/CreateTenderPage';
import ViewTenderPage from './components/Tender/ViewTenderPage';
import SubmitBidPage from './components/Tender/SubmitBidPage';
import BidDetailsPage from './components/Tender/BidDetailsPage';
import TenderManagementPage from './components/Admin/TenderManagementPage';
import BidEvaluationPage from './components/Admin/BidEvaluationPage';
import ReportsAnalyticsPage from './components/Admin/ReportsAnalyticsPage';
import AuditLogsPage from './components/Admin/AuditLogsPage';
import BlockchainTransactionsPage from './components/Admin/BlockchainTransactionsPage';
import NotificationsPage from './components/NotificationsPage';
import SettingsPage from './components/SettingsPage';
import HelpSupportPage from './components/HelpSupportPage';

const App = () => {
  return (
    <Router>
      <div className="App">
        {/* Navbar */}
        <Navbar />
        
        {/* Routing for all pages */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/bidder/dashboard" element={<BidderDashboard />} />
          <Route path="/profile" element={<UserProfilePage />} />
          <Route path="/tender/create" element={<CreateTenderPage />} />
          <Route path="/tender/view" element={<ViewTenderPage />} />
          <Route path="/tender/submit" element={<SubmitBidPage />} />
          <Route path="/tender/bid-details" element={<BidDetailsPage />} />
          <Route path="/admin/tender-management" element={<TenderManagementPage />} />
          <Route path="/admin/bid-evaluation" element={<BidEvaluationPage />} />
          <Route path="/admin/reports" element={<ReportsAnalyticsPage />} />
          <Route path="/admin/audit-logs" element={<AuditLogsPage />} />
          <Route path="/admin/blockchain-transactions" element={<BlockchainTransactionsPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/help" element={<HelpSupportPage />} />
        </Routes>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
