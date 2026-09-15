'use client';

import { useEffect, useState } from 'react';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';
import { analyticsAPI, channelsAPI } from '@/services/api';
import { formatNumber } from '@/utils/helpers';
import toast from 'react-hot-toast';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const { isLoading } = useProtectedRoute();
  const [stats, setStats] = useState(null);
  const [channels, setChannels] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dashboardRes, channelsRes] = await Promise.all([
          analyticsAPI.getDashboard(),
          channelsAPI.getAll(),
        ]);

        setStats(dashboardRes.data.data);
        setChannels(channelsRes.data.data);
      } catch (error) {
        toast.error('Failed to load dashboard');
      } finally {
        setIsLoadingData(false);
      }
    };

    if (!isLoading) {
      fetchData();
    }
  }, [isLoading]);

  if (isLoading || isLoadingData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm">Total Channels</p>
            <p className="text-3xl font-bold text-blue-600">{stats?.totalChannels || 0}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm">Total Videos</p>
            <p className="text-3xl font-bold text-purple-600">{stats?.totalVideos || 0}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm">Total Views</p>
            <p className="text-3xl font-bold text-green-600">{formatNumber(stats?.totalViews || 0)}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm">Avg Retention</p>
            <p className="text-3xl font-bold text-orange-600">{stats?.avgRetention || 0}%</p>
          </div>
        </div>

        {/* Channels List */}
        <div className="bg-white rounded-lg shadow p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Channels</h2>
          {channels.length === 0 ? (
            <p className="text-gray-600">No channels yet. Analyze your first YouTube channel!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {channels.map((channel) => (
                <div key={channel._id} className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition">
                  <img
                    src={channel.thumbnail}
                    alt={channel.name}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                  <h3 className="font-bold text-lg text-gray-800 mb-2">{channel.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{formatNumber(channel.subscriberCount)} subscribers</p>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition">
                    View Analysis
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
