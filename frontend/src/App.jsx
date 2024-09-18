// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RefundForm from './components/RefundForm';
import RefundList from './components/RefundList';
import Navbar from './components/NavBar';
import FarmerRefundManagement from './components/FarmerRefundManagement';
import FarmerIncomeDashboard from './components/FarmerIncomeDashboard';

function App() {
  return (
    <Router>
      <Navbar />
      
      <main className="p-4">
        <Routes>
          <Route path="/" element={<RefundForm />} />
          <Route path="/refunds" element={<RefundList />} />
          <Route path="/farmer-refund" element={<FarmerRefundManagement />} />
          <Route path="/farmer" element={<FarmerIncomeDashboard />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
