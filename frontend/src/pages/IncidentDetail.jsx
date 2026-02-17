import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getIncidentById, updateIncident } from '../services/api';
import { ArrowLeft, Save, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const IncidentDetail = () => {
  const { id } = useParams(); // Get ID from URL
  const navigate = useNavigate();
  const [incident, setIncident] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Editable Fields
  const [status, setStatus] = useState('');
  const [severity, setSeverity] = useState('');
  const [summary, setSummary] = useState('');

  useEffect(() => {
    loadIncident();
  }, [id]);

  const loadIncident = async () => {
    try {
      const data = await getIncidentById(id);
      setIncident(data);
      // Initialize form with existing data
      setStatus(data.status);
      setSeverity(data.severity);
      setSummary(data.summary || '');
    } catch (error) {
      alert("Error loading incident");
      navigate('/');
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateIncident(id, { status, severity, summary });
      alert("Incident updated successfully!");
      navigate('/');
    } catch (error) {
      alert("Failed to update: " + error.message);
    }
    setSaving(false);
  };

  if (loading) return <div className="p-8 text-center">Loading details...</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <button onClick={() => navigate('/')} className="flex items-center text-slate-500 hover:text-slate-800 mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Dashboard
      </button>

      {/* Header Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 mb-2">{incident.title}</h1>
            <div className="flex gap-4 text-sm text-slate-500">
              <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> Created: {new Date(incident.createdAt).toLocaleString()}</span>
              <span>•</span>
              <span>Service: <span className="font-semibold text-slate-700">{incident.service}</span></span>
              <span>•</span>
              <span>Owner: {incident.owner || 'Unassigned'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Form */}
      <div className="bg-white p-6 rounded-lg shadow border border-slate-200">
        <h2 className="text-lg font-semibold mb-4 border-b pb-2">Update Status & Details</h2>
        
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Current Status</label>
            <select 
              className="w-full p-2 border rounded-lg bg-slate-50 focus:ring-2 focus:ring-blue-500"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="OPEN">OPEN</option>
              <option value="MITIGATED">MITIGATED</option>
              <option value="RESOLVED">RESOLVED</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Severity</label>
            <select 
              className="w-full p-2 border rounded-lg bg-slate-50 focus:ring-2 focus:ring-blue-500"
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
            >
              <option value="SEV1">SEV1 (Critical)</option>
              <option value="SEV2">SEV2 (High)</option>
              <option value="SEV3">SEV3 (Medium)</option>
              <option value="SEV4">SEV4 (Low)</option>
            </select>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700 mb-1">Incident Summary</label>
          <textarea 
            rows="6"
            className="w-full p-3 border rounded-lg bg-slate-50 focus:ring-2 focus:ring-blue-500"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
        </div>

        <div className="flex justify-end">
          <button 
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncidentDetail;