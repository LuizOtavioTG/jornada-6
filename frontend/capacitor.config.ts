import type { CapacitorConfig } from '@capacitor/cli';

const DEFAULT_SERVER_URL = 'http://10.0.2.2:3000'; // Host machine when usando emulador Android
const shouldUseBundledAssets = process.env.CAP_USE_BUNDLED === 'true';
const serverUrl =
  process.env.CAP_SERVER_URL ?? process.env.NEXT_PUBLIC_CAP_SERVER_URL ?? DEFAULT_SERVER_URL;

const config: CapacitorConfig = {
  appId: 'com.jornada6.app',
  appName: 'os-management-system',
  webDir: 'out',
  server: shouldUseBundledAssets
    ? undefined
    : {
        url: serverUrl,
        cleartext: !serverUrl.startsWith('https'),
      },
};

export default config;
