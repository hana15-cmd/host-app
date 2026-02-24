import { describe, it, expect, vi } from 'vitest';
import { render, screen } from './utils';
import Home from '../pages/Home';
import * as router from 'react-router-dom';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe('Home', () => {
  it('should render welcome heading', () => {
    render(<Home />);
    expect(screen.getByText(/welcome to my mfe portal/i)).toBeInTheDocument();
  });

  it('should render subtitle text', () => {
    render(<Home />);
    expect(
      screen.getByText(/access all your dashboards and tools from a single place/i)
    ).toBeInTheDocument();
  });

  it('should render all three MFE tiles', () => {
    render(<Home />);
    
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Accounting')).toBeInTheDocument();
    expect(screen.getByText('User Management')).toBeInTheDocument();
  });

  it('should render tile descriptions', () => {
    render(<Home />);
    
    expect(screen.getByText(/view key metrics and analytics/i)).toBeInTheDocument();
    expect(screen.getByText(/manage invoices, expenses/i)).toBeInTheDocument();
    expect(screen.getByText(/administer user accounts and permissions/i)).toBeInTheDocument();
  });

  it('should render Go buttons for each tile', () => {
    render(<Home />);
    
    const buttons = screen.getAllByRole('button', { name: /go/i });
    expect(buttons).toHaveLength(3);
  });

  it('should navigate to dashboard when dashboard tile is clicked', async () => {
    const mockNavigate = vi.fn();
    vi.mocked(router.useNavigate).mockReturnValue(mockNavigate);

    const { user } = render(<Home />);
    
    const dashboardTile = screen.getByText('Dashboard').closest('div');
    if (dashboardTile) {
      await user.click(dashboardTile);
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    }
  });

  it('should navigate to accounting when accounting tile is clicked', async () => {
    const mockNavigate = vi.fn();
    vi.mocked(router.useNavigate).mockReturnValue(mockNavigate);

    const { user } = render(<Home />);
    
    const accountingTile = screen.getByText('Accounting').closest('div');
    if (accountingTile) {
      await user.click(accountingTile);
      expect(mockNavigate).toHaveBeenCalledWith('/accounting');
    }
  });

  it('should navigate to users when user management tile is clicked', async () => {
    const mockNavigate = vi.fn();
    vi.mocked(router.useNavigate).mockReturnValue(mockNavigate);

    const { user } = render(<Home />);
    
    const userTile = screen.getByText('User Management').closest('div');
    if (userTile) {
      await user.click(userTile);
      expect(mockNavigate).toHaveBeenCalledWith('/user-management');
    }
  });

  it('should have clickable tiles with cursor pointer', () => {
    const { container } = render(<Home />);
    
    const tiles = container.querySelectorAll('.cursor-pointer');
    expect(tiles.length).toBeGreaterThan(0);
  });
});
