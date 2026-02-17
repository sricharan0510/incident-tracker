import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IncidentList from './pages/IncidentList';
import IncidentForm from './pages/IncidentForm';
import IncidentDetail from './pages/IncidentDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IncidentList />} />
        <Route path="/create" element={<IncidentForm />} /> 
        <Route path="/incidents/:id" element={<IncidentDetail />} /> 
      </Routes>
    </Router>
  );
}

export default App;