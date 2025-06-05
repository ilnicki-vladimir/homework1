import React, { useState, useEffect } from 'react';

interface WorkerMessage {
  type: 'progress' | 'complete';
  result?: number;
  progress?: number;
  current?: number;
}

export default function Dashboard() {
  const [data, setData] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if Web Workers are supported
    if (typeof Worker === 'undefined') {
      setError('Web Workers are not supported in this browser');
      return;
    }

    setLoading(true);
    setError(null);

    // Create a new Web Worker
    const worker = new Worker('/heavyCalculation.worker.js');

    // Handle messages from the worker
    worker.onmessage = (e: MessageEvent<WorkerMessage>) => {
      const { type, result, progress: workerProgress } = e.data;

      if (type === 'progress' && workerProgress !== undefined) {
        setProgress(workerProgress);
      } else if (type === 'complete' && result !== undefined) {
        setData(result);
        setLoading(false);
        setProgress(100);
      }
    };

    // Handle worker errors
    worker.onerror = (error) => {
      console.error('Worker error:', error);
      setError('Calculation failed');
      setLoading(false);
    };

    // Start the calculation
    worker.postMessage({ iterations: 1e8 });

    // Cleanup function
    return () => {
      worker.terminate();
    };
  }, []);

  const handleRecalculate = () => {
    setData(null);
    setProgress(0);
    setLoading(true);
    setError(null);

    const worker = new Worker('/heavyCalculation.worker.js');

    worker.onmessage = (e: MessageEvent<WorkerMessage>) => {
      const { type, result, progress: workerProgress } = e.data;

      if (type === 'progress' && workerProgress !== undefined) {
        setProgress(workerProgress);
      } else if (type === 'complete' && result !== undefined) {
        setData(result);
        setLoading(false);
        setProgress(100);
      }
    };

    worker.onerror = (error) => {
      console.error('Worker error:', error);
      setError('Calculation failed');
      setLoading(false);
    };

    worker.postMessage({ iterations: 1e8 });
  };

  return (
    <div className="dashboard">
      <h2>Heavy Computation Dashboard</h2>
      
      {error && (
        <div style={{ color: 'red', textAlign: 'center', marginBottom: '20px' }}>
          Error: {error}
        </div>
      )}

      {loading && (
        <div className="loading">
          <p>Computing sum of 0 to 100,000,000...</p>
          <div style={{ marginBottom: '10px' }}>
            Progress: {Math.round(progress)}%
          </div>
          <div style={{ 
            width: '100%', 
            backgroundColor: '#e0e0e0', 
            borderRadius: '4px',
            overflow: 'hidden'
          }}>
            <div 
              style={{ 
                width: `${progress}%`, 
                height: '20px', 
                backgroundColor: '#4CAF50',
                transition: 'width 0.3s ease'
              }}
            />
          </div>
        </div>
      )}

      {data !== null && (
        <div className="result">
          <p>Result: {data.toLocaleString()}</p>
          <p style={{ fontSize: '14px', color: '#666' }}>
            ✅ Calculated using Web Worker (no UI blocking)
          </p>
        </div>
      )}

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button 
          onClick={handleRecalculate}
          disabled={loading}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: loading ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Calculating...' : 'Recalculate'}
        </button>
      </div>

      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
        <h3>Performance Benefits:</h3>
        <ul style={{ textAlign: 'left' }}>
          <li>✅ Main thread remains responsive</li>
          <li>✅ UI interactions remain smooth</li>
          <li>✅ Progress tracking available</li>
          <li>✅ Reduced Total Blocking Time</li>
          <li>✅ Better Core Web Vitals scores</li>
        </ul>
      </div>
    </div>
  );
} 