import VConsole from 'vconsole';

let vConsoleInstance: VConsole|null = null;

// Initialize vConsole for non-production environments
export const initVConsole = () => {
  if (process.env.NODE_ENV !== 'production' && typeof window !== 'undefined') {
    if (!vConsoleInstance) {
      vConsoleInstance = new VConsole();
      console.log('vConsole initialized in development mode');
    }
    return vConsoleInstance;
  }
  return null;
};

// Use a URL parameter to initialize vConsole in production (for debugging)
export const initVConsoleWithParam = () => {
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    const debug = urlParams.get('debug');
    
    if (debug === 'true' && !vConsoleInstance) {
      vConsoleInstance = new VConsole();
      console.log('vConsole initialized via URL parameter');
    }
    return vConsoleInstance;
  }
  return null;
};

// Destroy vConsole instance
export const destroyVConsole = () => {
  if (vConsoleInstance) {
    vConsoleInstance.destroy();
    vConsoleInstance = null;
    console.log('vConsole destroyed');
  }
};