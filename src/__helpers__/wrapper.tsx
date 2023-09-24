import { render, RenderOptions } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { InitialEntry } from 'history';

const createClientWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        cacheTime: 0,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
      },
    },
  });
  return ({ children }: { children: React.ReactElement }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

const createMemoryRouterWrapper = (initialEntries: InitialEntry[]) => {
  return ({ children }: { children: React.ReactElement }) => (
    <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
  );
};

const createWrappers = (initialEntries: InitialEntry[]) => {
  const ClientWrapper = createClientWrapper();
  const MemoryRouterWrapper = createMemoryRouterWrapper(initialEntries);
  return ({ children }: { children: React.ReactElement }) => (
    <ClientWrapper>
      <MemoryRouterWrapper>{children}</MemoryRouterWrapper>
    </ClientWrapper>
  );
};

export const renderWithWrappers = (
  ui: React.ReactElement,
  initialEntries: InitialEntry[] = ['/'],
  options?: Omit<RenderOptions, 'wrapper'>,
) => {
  return render(ui, { wrapper: createWrappers(initialEntries), ...options });
};
