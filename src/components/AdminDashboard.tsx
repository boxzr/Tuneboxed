import React, { useEffect, useState } from 'react';
import { getAllUsers, getPageViews } from '../firebase';

// Define custom type for visitor data
interface VisitorData {
  id: string;
  email?: string;
  name?: string;
  date: string;
}

// Define page view type
interface PageView {
  path: string;
  timestamp: string;
}

const AdminDashboard: React.FC = () => {
  const [visitors, setVisitors] = useState<VisitorData[]>([]);
  const [pageViews, setPageViews] = useState<PageView[]>([]);
  const [isAdmin] = useState(true); // Always admin in mock mode
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalVisitors: 0,
    totalSignups: 0,
    pageViewCount: 0,
    updateSignups: 0,
    mostViewedPage: '',
  });

  useEffect(() => {
    // Load visitors and page views
    const loadData = async () => {
      try {
        // Get users from localStorage
        const users = getAllUsers();
        setVisitors(users);
        
        // Get page views from localStorage
        const views = getPageViews();
        setPageViews(views);
        
        // Calculate stats
        const updateSignupCount = views.filter((v: PageView) => v.path === 'sign_up_for_updates').length;
        
        // Count page views by path
        const pageViewsByPath: {[key: string]: number} = {};
        views.forEach((view: PageView) => {
          pageViewsByPath[view.path] = (pageViewsByPath[view.path] || 0) + 1;
        });
        
        // Find most viewed page
        let mostViewed = '';
        let maxViews = 0;
        Object.entries(pageViewsByPath).forEach(([path, count]) => {
          if (count > maxViews) {
            mostViewed = path;
            maxViews = count;
          }
        });
        
        setStats({
          totalVisitors: users.length,
          totalSignups: users.length,
          pageViewCount: views.length,
          updateSignups: updateSignupCount,
          mostViewedPage: mostViewed
        });
        
        setLoading(false);
      } catch (error) {
        console.error('Error loading admin data:', error);
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  if (loading) {
    return <div className="admin-loading">Loading dashboard...</div>;
  }

  if (!isAdmin) {
    return <div className="admin-unauthorized">You must be an admin to view this page.</div>;
  }
  
  // Get recent page views (last 20)
  const recentPageViews = [...pageViews]
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 20);

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      
      <div className="admin-stats">
        <div className="stat-card">
          <h3>Total Visitors</h3>
          <p className="stat-number">{stats.totalVisitors}</p>
        </div>
        <div className="stat-card">
          <h3>Email Signups</h3>
          <p className="stat-number">{stats.totalSignups}</p>
        </div>
        <div className="stat-card">
          <h3>Update Signups</h3>
          <p className="stat-number">{stats.updateSignups}</p>
        </div>
        <div className="stat-card">
          <h3>Page Views</h3>
          <p className="stat-number">{stats.pageViewCount}</p>
        </div>
      </div>
      
      <h2>Most Viewed Page</h2>
      <div className="visitor-list">
        <div className="most-viewed-page">
          <strong>{stats.mostViewedPage}</strong> - {pageViews.filter(p => p.path === stats.mostViewedPage).length} views
        </div>
      </div>
      
      <h2>Recent Visitors</h2>
      <div className="visitor-list">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {visitors.map((visitor) => (
              <tr key={visitor.id}>
                <td>{visitor.date || new Date(visitor.id.split('_')[1]).toLocaleString()}</td>
                <td>{visitor.name || 'N/A'}</td>
                <td>{visitor.email || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <h2>Recent Page Views</h2>
      <div className="visitor-list">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Page</th>
            </tr>
          </thead>
          <tbody>
            {recentPageViews.map((view, index) => (
              <tr key={index}>
                <td>{new Date(view.timestamp).toLocaleString()}</td>
                <td>{view.path}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard; 