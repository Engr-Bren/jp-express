// pages/_app.tsx

import { CacheProvider } from '@emotion/react';
import { EmotionCache } from '@emotion/utils';
import createEmotionCache from '../src/createEmotionCache'; // Replace with your path

// Create an Emotion cache instance
const clientSideEmotionCache = createEmotionCache();

function MyApp({ Component, pageProps }: any) {
  return (
    <CacheProvider value={clientSideEmotionCache}>
      <Component {...pageProps} />
    </CacheProvider>
  );
}

export default MyApp;
