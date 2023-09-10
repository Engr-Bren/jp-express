// hooks/useAuthentication.tsx
import useSWR, { mutate } from 'swr';
import { useRouter } from 'next/router';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const broadcastChannel = new BroadcastChannel('auth');

export function useAuthentication() {
  const { data, error } = useSWR('/api/auth', fetcher);
  const router = useRouter();

  const logout = async () => {
    if (!data?.authenticated) {
      router.push('/login');
      return;
    }

    broadcastChannel.postMessage({ type: 'logout' });

    mutate('/api/auth');
    mutate('/api/auth', undefined, false);
  };

  broadcastChannel.addEventListener('message', (event) => {
    if (event.data.type === 'logout') {
      logout();
    }
  });

  return {
    isAuthenticated: data?.authenticated || false,
    email: data?.email || '',
    isLoading: !error && !data,
    isError: error, 
    logout,
  };
}
