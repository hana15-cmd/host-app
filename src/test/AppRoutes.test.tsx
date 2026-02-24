import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AppRoutes from '../router/AppRoutes';

// Mock Layout to simplify testing
vi.mock('../layout/Layout', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div data-testid="layout">{children}</div>,
}));

describe('AppRoutes', () => {
  it('should render Home component on root path', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/welcome to my mfe portal/i)).toBeInTheDocument();
    });
  });

  it('should render Dashboard MFE on /dashboard path', async () => {
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <AppRoutes />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId('mock-dashboard-app')).toBeInTheDocument();
    });
  });

  it('should render Accounting MFE on /accounting path', async () => {
    render(
      <MemoryRouter initialEntries={['/accounting']}>
        <AppRoutes />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId('mock-accounting-app')).toBeInTheDocument();
    });
  });

  it('should render User Management MFE on /user-management path', async () => {
    render(
      <MemoryRouter initialEntries={['/user-management']}>
        <AppRoutes />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId('mock-user-management-app')).toBeInTheDocument();
    });
  });

  it('should wrap content in Layout component', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId('layout')).toBeInTheDocument();
    });
  });

  it('should handle nested routes with /*', async () => {
    render(
      <MemoryRouter initialEntries={['/dashboard/nested']}>
        <AppRoutes />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId('mock-dashboard-app')).toBeInTheDocument();
    });
  });

  it('should handle accounting nested routes', async () => {
    render(
      <MemoryRouter initialEntries={['/accounting/invoices']}>
        <AppRoutes />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId('mock-accounting-app')).toBeInTheDocument();
    });
  });

  it('should handle user-management nested routes', async () => {
    render(
      <MemoryRouter initialEntries={['/user-management/users']}>
        <AppRoutes />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId('mock-user-management-app')).toBeInTheDocument();
    });
  });
});
