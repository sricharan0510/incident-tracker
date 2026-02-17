import { useEffect, useState } from 'react';
import { fetchIncidents } from '../services/api';
import { AlertCircle, CheckCircle, Search, ArrowUpDown, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const IncidentList = () => {
  const navigate = useNavigate();
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [severity, setSeverity] = useState('');
  const [status, setStatus] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [order, setOrder] = useState('DESC');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    loadData();
  }, [page, debouncedSearch, severity, status, sortBy, order]);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchIncidents(page, 10, debouncedSearch, severity, status, sortBy, order);
      setIncidents(data.incidents);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Failed to fetch incidents", error);
    }
    setLoading(false);
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setOrder(order === 'ASC' ? 'DESC' : 'ASC');
    } else {
      setSortBy(field);
      setOrder('DESC');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'OPEN': return 'bg-red-100 text-red-800';
      case 'MITIGATED': return 'bg-yellow-100 text-yellow-800';
      case 'RESOLVED': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-800">Incident Tracker</h1>
        <button 
          onClick={() => navigate('/create')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
        >
          + New Incident
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 mb-6 flex gap-4 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search incidents..." 
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <select 
          className="border p-2 rounded-lg bg-slate-50"
          value={severity}
          onChange={(e) => { setSeverity(e.target.value); setPage(1); }}
        >
          <option value="">All Severities</option>
          <option value="SEV1">SEV1 (Critical)</option>
          <option value="SEV2">SEV2 (High)</option>
          <option value="SEV3">SEV3 (Medium)</option>
          <option value="SEV4">SEV4 (Low)</option>
        </select>

        <select 
          className="border p-2 rounded-lg bg-slate-50"
          value={status}
          onChange={(e) => { setStatus(e.target.value); setPage(1); }}
        >
          <option value="">All Statuses</option>
          <option value="OPEN">Open</option>
          <option value="MITIGATED">Mitigated</option>
          <option value="RESOLVED">Resolved</option>
        </select>
      </div>

      <div className="bg-white rounded-lg shadow border border-slate-200 overflow-hidden relative min-h-[400px]">
        
        {/* {loading && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center z-10 backdrop-blur-[1px]">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        )} */}

        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 text-slate-600 uppercase text-sm font-semibold">
            <tr>
              <th className="p-4 cursor-pointer hover:bg-slate-100" onClick={() => handleSort('title')}>
                Title <ArrowUpDown className="inline h-4 w-4 ml-1" />
              </th>
              <th className="p-4 cursor-pointer hover:bg-slate-100" onClick={() => handleSort('severity')}>
                Severity
              </th>
              <th className="p-4 cursor-pointer hover:bg-slate-100" onClick={() => handleSort('status')}>
                Status
              </th>
              <th className="p-4">Owner</th>
              <th className="p-4 cursor-pointer hover:bg-slate-100" onClick={() => handleSort('createdAt')}>
                Created
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {incidents.map((inc) => (
              <tr 
              key={inc.id} className="hover:bg-slate-50 transition cursor-pointer" onClick={() => navigate(`/incidents/${inc.id}`)}>
                <td className="p-4 font-medium text-slate-900">{inc.title}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    inc.severity === 'SEV1' ? 'bg-red-50 text-red-600' : 
                    inc.severity === 'SEV2' ? 'bg-orange-50 text-orange-600' : 'bg-blue-50 text-blue-600'
                  }`}>
                    {inc.severity}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold flex items-center w-fit gap-1 ${getStatusColor(inc.status)}`}>
                    {inc.status === 'RESOLVED' ? <CheckCircle className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
                    {inc.status}
                  </span>
                </td>
                <td className="p-4 text-slate-500">{inc.owner || 'Unassigned'}</td>
                <td className="p-4 text-slate-500">{new Date(inc.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {!loading && incidents.length === 0 && (
          <div className="text-center p-8 text-slate-500">No incidents found matching your filters.</div>
        )}
      </div>

      <div className="flex justify-between items-center mt-6">
        <button 
          disabled={page === 1 || loading}
          onClick={() => setPage(p => p - 1)}
          className="px-4 py-2 border rounded-lg hover:bg-slate-100 disabled:opacity-50 transition"
        >
          Previous
        </button>
        <span className="text-slate-600">Page {page} of {totalPages}</span>
        <button 
          disabled={page === totalPages || loading}
          onClick={() => setPage(p => p + 1)}
          className="px-4 py-2 border rounded-lg hover:bg-slate-100 disabled:opacity-50 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default IncidentList;