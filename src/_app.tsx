import { useEffect } from 'react';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '../src/utils/createEmotionCache';
import '../styles/globals.css';

// Criação do cache de Emotion
const clientSideEmotionCache = createEmotionCache();

// Tema personalizado do MUI
const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

function MyApp({ Component, pageProps, emotionCache = clientSideEmotionCache }: AppProps & { emotionCache?: any }) {
  const router = useRouter();

  // Checa autenticação em cada navegação
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token && router.pathname !== '/login') {
      router.push('/login');
    }
  }, [router]);

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline garante uma base consistente de estilos */}
        <CssBaseline />
        {/* Renderiza o componente da página atual */}
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
