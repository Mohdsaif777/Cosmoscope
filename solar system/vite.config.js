import { defineConfig } from 'vite';

export default defineConfig({
  root: 'cosmoscope/public',           // Point to the folder where 'public' is located
  publicDir: '../../static',        // Static assets will be served from the 'static' folder
  base: './',                        // Use relative paths for assets
  server: {
    host: true,                      // Open the server to the local network and display URL
    open: !('SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env) || 'home.html',       // Automatically open 'home.html' in the browser
    port: 3001,                      // Default Vite port
  },
  build: {
    outDir: '../../dist',            // Output production build to the 'dist' folder
    emptyOutDir: true,               // Empty the output directory before building
    sourcemap: true                  // Generate source maps for debugging
  }
});
