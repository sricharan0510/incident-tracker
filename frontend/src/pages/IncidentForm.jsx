import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createIncident } from '../services/api';
import { ArrowLeft } from 'lucide-react';

const IncidentForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    service: '',
    severity: 'SEV4',
    status: 'OPEN',
    owner: '',
    summary: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createIncident(formData);
      navigate('/'); 
    } catch (error) {
      alert("Failed to create incident: " + error.message);
    }
    setLoading(false);
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <button onClick={() => navigate('/')} className="flex items-center text-slate-500 hover:text-slate-800 mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Incidents
      </button>

      <h1 className="text-3xl font-bold text-slate-800 mb-6">Create New Incident</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow border border-slate-200 space-y-6">
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
          <input 
            required
            type="text" 
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="e.g. Database connection timeout"
            value={formData.title}
            onChange={e => setFormData({...formData, title: e.target.value})}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Service</label>
            <input 
              required
              type="text" 
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="e.g. Payment Gateway"
              value={formData.service}
              onChange={e => setFormData({...formData, service: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Severity</label>
            <select 
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.severity}
              onChange={e => setFormData({...formData, severity: e.target.value})}
            >
              <option value="SEV1">SEV1 (Critical)</option>
              <option value="SEV2">SEV2 (High)</option>
              <option value="SEV3">SEV3 (Medium)</option>
              <option value="SEV4">SEV4 (Low)</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Owner (Optional)</label>
          <input 
            type="text" 
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="e.g. John Doe"
            value={formData.owner}
            onChange={e => setFormData({...formData, owner: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Summary</label>
          <textarea 
            rows="4"
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Describe what happened..."
            value={formData.summary}
            onChange={e => setFormData({...formData, summary: e.target.value})}
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <button 
            type="button"
            onClick={() => navigate('/')}
            className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg"
          >
            Cancel
          </button>
          <button 
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Incident'}
          </button>
        </div>

      </form>
    </div>
  );
};

export default IncidentForm;