import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.oraculo.app',
  appName: 'Oraculo medicina dimensional',
  webDir: 'dist/oraculo/browser',
  server: {
    cleartext: true, // Permitir conexiones HTTP (útil en desarrollo)
  },
};

export default config;


