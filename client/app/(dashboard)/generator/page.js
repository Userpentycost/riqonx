'use client';

import { useState } from 'react';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';
import { aiAPI } from '@/services/api';
import toast from 'react-hot-toast';

export default function GeneratorPage() {
  const { isLoading } = useProtectedRoute();
  const [activeTab, setActiveTab] = useState('script');
  const [scriptInput, setScriptInput] = useState('');
  const [generatedScript, setGeneratedScript] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleRewriteScript = async () => {
    if (!scriptInput.trim()) {
      toast.error('Please enter a script');
      return;
    }

    setIsGenerating(true);

    try {
      const res = await aiAPI.rewriteScript(scriptInput);
      setGeneratedScript(res.data.data.rewrittenScript || res.data.data);
      toast.success('Script rewritten successfully!');
    } catch (error) {
      toast.error('Failed to rewrite script');
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedScript);
    toast.success('Copied to clipboard!');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">AI Content Generator</h1>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex space-x-4 mb-8 border-b border-gray-200">
            {['script', 'ideas', 'titles', 'analysis'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 font-semibold capitalize transition ${
                  activeTab === tab
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === 'script' && (
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Original Script</label>
                <textarea
                  value={scriptInput}
                  onChange={(e) => setScriptInput(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-64"
                  placeholder="Paste your video script here..."
                />
              </div>

              <button
                onClick={handleRewriteScript}
                disabled={isGenerating}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 rounded-lg transition"
              >
                {isGenerating ? 'Rewriting...' : 'Rewrite for Copyright Compliance'}
              </button>

              {generatedScript && (
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Rewritten Script</label>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-300 h-64 overflow-y-auto mb-4">
                    <p className="text-gray-800 whitespace-pre-wrap">{generatedScript}</p>
                  </div>
                  <button
                    onClick={copyToClipboard}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-lg transition"
                  >
                    Copy to Clipboard
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'ideas' && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">Content ideas generator coming soon...</p>
            </div>
          )}

          {activeTab === 'titles' && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">Title generator coming soon...</p>
            </div>
          )}

          {activeTab === 'analysis' && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">Script analysis coming soon...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
