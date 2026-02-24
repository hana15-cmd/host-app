import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import AppRoutes from '../../router/AppRoutes';

describe('Navigation Integration Tests', () => {
  it('should navigate from Home to Dashboard via link', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/welcome to my mfe portal/i)).toBeInTheDocument();
    });

    const dashboardLink = screen.getByRole('link', { name: /dashboard/i });
    await user.click(dashboardLink);

    await waitFor(() => {
      expect(screen.getByTestId('mock-dashboard-app')).toBeInTheDocument();
    });
  });

  it('should navigate from Home to Accounting via link', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/welcome to my mfe portal/i)).toBeInTheDocument();
    });

    const accountingLink = screen.getByRole('link', { name: /accounting/i });
    await user.click(accountingLink);

    await waitFor(() => {
      expect(screen.getByTestId('mock-accounting-app')).toBeInTheDocument();
    });
  });

  it('should navigate from Home to User Management via link', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/welcome to my mfe portal/i)).toBeInTheDocument();
    });

    const userLink = screen.getByRole('link', { name: /user management/i });
    await user.click(userLink);

    await waitFor(() => {
      expect(screen.getByTestId('mock-user-management-app')).toBeInTheDocument();
    });
  });

  it('should maintain layout across navigation', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>
    );

    // Check layout is present on home
    expect(screen.getByText('My MFE Portal')).toBeInTheDocument();
    expect(screen.getByText(/© 2026 My Company/i)).toBeInTheDocument();

    // Navigate to dashboard
    const dashboardLink = screen.getByRole('link', { name: /dashboard/i });
    await user.click(dashboardLink);

    await waitFor(() => {
      // Layout should still be present
      expect(screen.getByText('My MFE Portal')).toBeInTheDocument();
      expect(screen.getByText(/© 2026 My Company/i)).toBeInTheDocument();
    });
  });

  it('should navigate back to home from any MFE', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <AppRoutes />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId('mock-dashboard-app')).toBeInTheDocument();
    });

    const homeLink = screen.getByRole('link', { name: /home/i });
    await user.click(homeLink);

    await waitFor(() => {
      expect(screen.getByText(/welcome to my mfe portal/i)).toBeInTheDocument();
    });
  });

  it('should navigate between different MFEs', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <AppRoutes />
      </MemoryRouter>
    );

    // Start at Dashboard
    await waitFor(() => {
      expect(screen.getByTestId('mock-dashboard-app')).toBeInTheDocument();
    });

    // Navigate to Accounting
    const accountingLink = screen.getByRole('link', { name: /accounting/i });
    await user.click(accountingLink);

    await waitFor(() => {
      expect(screen.getByTestId('mock-accounting-app')).toBeInTheDocument();
    });

    // Navigate to User Management
    const userLink = screen.getByRole('link', { name: /user management/i });
    await user.click(userLink);

    await waitFor(() => {
      expect(screen.getByTestId('mock-user-management-app')).toBeInTheDocument();
    });
  });

  it('should show all navigation links on every page', async () => {
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <AppRoutes />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /dashboard/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /accounting/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /user management/i })).toBeInTheDocument();
    });
  });

  it('should handle direct URL navigation to MFEs', async () => {
    render(
      <MemoryRouter initialEntries={['/accounting']}>
        <AppRoutes />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId('mock-accounting-app')).toBeInTheDocument();
    });
  });
});
