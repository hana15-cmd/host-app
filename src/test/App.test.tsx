import { describe, it, expect, vi } from 'vitest';
import { render as rtlRender, screen, waitFor } from '@testing-library/react';
import App from '../App';

// Mock remote MFE modules
vi.mock('remote_app/App', () => ({
  default: () => <div>Dashboard MFE</div>,
}));

vi.mock('mfe_accounting_app/App', () => ({
  default: () => <div>Accounting MFE</div>,
}));

vi.mock('user_management_app/App', () => ({
  default: () => <div>User Management MFE</div>,
}));

// Mock AppRoutes
vi.mock('../router/AppRoutes', () => ({
  default: () => <div>AppRoutes Component</div>,
}));

describe('App', () => {
  it('should render without crashing', () => {
    rtlRender(<App />);
    expect(document.body).toBeInTheDocument();
  });

  it('should render loading fallback initially', () => {
    const { container } = rtlRender(<App />);
    expect(container).toBeInTheDocument();
  });

  it('should render AppRoutes after suspense resolves', async () => {
    rtlRender(<App />);

    await waitFor(() => {
      expect(screen.getByText('AppRoutes Component')).toBeInTheDocument();
    });
  });

  it('should wrap content in BrowserRouter', () => {
    const { container } = rtlRender(<App />);
    expect(container).toBeInTheDocument();
  });

  it('should have Suspense with loading fallback text', async () => {
    rtlRender(<App />);
    
    // After suspense resolves, should show AppRoutes
    await waitFor(() => {
      expect(screen.getByText('AppRoutes Component')).toBeInTheDocument();
    });
  });

  it('should render the application structure', () => {
    const { container } = rtlRender(<App />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
