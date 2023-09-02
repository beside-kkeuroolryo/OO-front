import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import App from '@/App';
import queryClient from '@/api/config/queryClilent';

jest.mock('axios');

describe('Home page', () => {
  let originalClose: () => void;

  beforeAll(() => {
    originalClose = window.HTMLDialogElement.prototype.close;
    window.HTMLDialogElement.prototype.close = jest.fn();
  });

  afterAll(() => {
    window.HTMLDialogElement.prototype.close = originalClose;
  });

  test('navigates to the home page when logo is clicked', async () => {
    render(<App />, { wrapper: MemoryRouter });
    const user = userEvent.setup();

    const link = screen.getByRole('link', { name: '골라바 홈' });
    await user.click(link);

    expect(screen.getByRole('link', { name: '골라바 홈' })).toBeInTheDocument();
  });

  test('navigates to the my page when star icon is clicked', async () => {
    render(<App />, { wrapper: MemoryRouter });
    const user = userEvent.setup();

    const link = screen.getByRole('link', { name: '보관함' });
    await user.click(link);

    expect(screen.getByRole('heading', { name: '보관함' })).toBeInTheDocument();
  });

  test('navigates to the question page when self link is clicked', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>,
      { wrapper: MemoryRouter },
    );
    const user = userEvent.setup();

    const link = screen.getByRole('link', { name: /셀프/ });
    await user.click(link);

    expect(screen.getByText('과연 당신의 선택은?')).toBeInTheDocument();
  });

  test('navigates to the question page when couple link is clicked', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>,
      { wrapper: MemoryRouter },
    );
    const user = userEvent.setup();

    const link = screen.getByRole('link', { name: /커플/ });
    await user.click(link);

    expect(screen.getByText('과연 당신의 선택은?')).toBeInTheDocument();
  });

  test('navigates to the question page when friend link is clicked', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>,
      { wrapper: MemoryRouter },
    );
    const user = userEvent.setup();

    const link = screen.getByRole('link', { name: /우정/ });
    await user.click(link);

    expect(screen.getByText('과연 당신의 선택은?')).toBeInTheDocument();
  });

  test('navigates to the question page when random link is clicked', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>,
      { wrapper: MemoryRouter },
    );
    const user = userEvent.setup();

    const link = screen.getByRole('link', { name: /랜덤/ });
    await user.click(link);

    expect(screen.getByText('과연 당신의 선택은?')).toBeInTheDocument();
  });

  test('navigates to the question page when usermade link is clicked', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>,
      { wrapper: MemoryRouter },
    );
    const user = userEvent.setup();

    const link = screen.getByRole('link', { name: /같이해요/ });
    await user.click(link);

    expect(screen.getByText('과연 당신의 선택은?')).toBeInTheDocument();
  });

  test('navigates to the request page when request link is clicked', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>,
      { wrapper: MemoryRouter },
    );
    const user = userEvent.setup();

    const link = screen.getByRole('link', { name: '만들고 싶은 밸런스 게임이 있어요!' });
    await user.click(link);

    expect(screen.getByRole('heading', { name: '골라바 만들기' })).toBeInTheDocument();
  });
});
