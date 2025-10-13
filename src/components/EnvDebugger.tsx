import { useEffect, useState } from 'react';

const EnvDebugger = () => {
  const [envStatus, setEnvStatus] = useState<{
    supabaseUrl: string | undefined;
    supabaseKey: string | undefined;
    isValid: boolean;
  }>({
    supabaseUrl: undefined,
    supabaseKey: undefined,
    isValid: false
  });

  useEffect(() => {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
    
    const isValid = !!(supabaseUrl && supabaseKey && 
      supabaseUrl.includes('supabase.co') && 
      supabaseKey.startsWith('eyJ'));

    setEnvStatus({
      supabaseUrl,
      supabaseKey: supabaseKey ? `${supabaseKey.substring(0, 20)}...` : undefined,
      isValid
    });

    // Log to console for debugging
    console.log('Environment Debug:', {
      supabaseUrl,
      supabaseKey: supabaseKey ? `${supabaseKey.substring(0, 20)}...` : undefined,
      isValid,
      isProduction: import.meta.env.PROD,
      isDevelopment: import.meta.env.DEV
    });
  }, []);

  // Only show in development or if there's an issue
  if (import.meta.env.PROD && envStatus.isValid) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-slate-800 text-white p-4 rounded-lg shadow-lg max-w-sm text-xs">
      <h4 className="font-bold mb-2">Environment Status</h4>
      <div className="space-y-1">
        <div>
          <span className="font-medium">Supabase URL:</span>
          <span className={`ml-2 ${envStatus.supabaseUrl ? 'text-green-400' : 'text-red-400'}`}>
            {envStatus.supabaseUrl ? '✓ Set' : '✗ Missing'}
          </span>
        </div>
        <div>
          <span className="font-medium">Supabase Key:</span>
          <span className={`ml-2 ${envStatus.supabaseKey ? 'text-green-400' : 'text-red-400'}`}>
            {envStatus.supabaseKey ? '✓ Set' : '✗ Missing'}
          </span>
        </div>
        <div>
          <span className="font-medium">Status:</span>
          <span className={`ml-2 ${envStatus.isValid ? 'text-green-400' : 'text-red-400'}`}>
            {envStatus.isValid ? '✓ Valid' : '✗ Invalid'}
          </span>
        </div>
        {envStatus.supabaseUrl && (
          <div className="text-gray-300 break-all">
            URL: {envStatus.supabaseUrl}
          </div>
        )}
      </div>
    </div>
  );
};

export default EnvDebugger;
