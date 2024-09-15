// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RefundForm from './components/RefundForm';
import RefundList from './components/RefundList';

function App() {
  return (
    <Router>
      <header className="bg-blue-500 text-white p-4 text-center text-2xl">
        Refund Management
      </header>
      <nav className="p-4">
        <ul className="flex space-x-4 justify-center">
          <li><Link to="/" className="text-blue-500 hover:underline">Request Refund</Link></li>
          <li><Link to="/refunds" className="text-blue-500 hover:underline">View Refunds</Link></li>
        </ul>
      </nav>
      <main className="p-4">
        <Routes>
          <Route path="/" element={<RefundForm />} />
          <Route path="/refunds" element={<RefundList />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
