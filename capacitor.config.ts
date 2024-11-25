import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.oraculo.app',
  appName: 'Oraculo medicina dimensional',
  webDir: 'dist/oraculo/browser',
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000, // Duración del splash (en ms)
      backgroundColor: '#ffffff', // Color de fondo
      androidScaleType: 'CENTER_CROP', // Escala en Android
      showSpinner: true, // Muestra un spinner de carga
      spinnerColor: '#000000' // Color del spinner
    },
  }
};

export default config;


