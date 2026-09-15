'use client';

import { useState } from 'react';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';
import { channelsAPI } from '@/services/api';
import toast from 'react-hot-toast';

export default function AnalyzeChannel() {
  const { isLoading } = useProtectedRoute();
  const [channelId, setChannelId] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async (e) => {
    e.preventDefault();

    if (!channelId.trim()) {
      toast.error('Please enter a YouTube channel ID');
      return;
    }

    setIsAnalyzing(true);

    try {
      const res = await channelsAPI.analyze(channelId);
      toast.success('Channel analysis started! Check your dashboard.');
      setChannelId('');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to analyze channel');
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-600 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Analyze YouTube Channel</h1>
          <p className="text-gray-600 mb-8">Enter a YouTube channel ID to start analyzing</p>

          <form onSubmit={handleAnalyze} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">YouTube Channel ID</label>
              <input
                type="text"
                value={channelId}
                onChange={(e) => setChannelId(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., UCkRfArvrzheW2E7b6SVV_5w"
                required
              />
              <p className="text-sm text-gray-500 mt-2">
                You can find the channel ID in the YouTube channel URL or use the channel handle.
              </p>
            </div>

            <button
              type="submit"
              disabled={isAnalyzing}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 rounded-lg transition text-lg"
            >
              {isAnalyzing ? 'Analyzing...' : 'Analyze Channel'}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4">What You Get:</h2>
            <ul className="space-y-3 text-gray-700">
              <li>✅ Comprehensive channel analysis</li>
              <li>✅ Video performance metrics</li>
              <li>✅ Hook and engagement patterns</li>
              <li>✅ Pacing analysis recommendations</li>
              <li>✅ AI-generated content ideas</li>
              <li>✅ Script rewriting for copyright compliance</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
