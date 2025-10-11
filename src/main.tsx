import '../src/scss/styles.scss'
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import App from './App.tsx';
import store from './slices/store.ts';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            refetchOnWindowFocus: false,
        },
        mutations: {
            retry: 1,
        },
    },
});

createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
        <Provider store={store}>
            <App />
        </Provider>
    </QueryClientProvider>

)
