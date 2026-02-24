import { describe, it, expect } from 'vitest';
import { render, screen } from './utils';
import Layout from '../layout/Layout';

describe('Layout', () => {
  it('should render the header with portal title', () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );

    expect(screen.getByText('My MFE Portal')).toBeInTheDocument();
  });

  it('should render all navigation links', () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );

    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /dashboard/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /accounting/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /user management/i })).toBeInTheDocument();
  });

  it('should have correct href attributes for navigation links', () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );

    expect(screen.getByRole('link', { name: /home/i })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: /dashboard/i })).toHaveAttribute('href', '/dashboard');
    expect(screen.getByRole('link', { name: /accounting/i })).toHaveAttribute('href', '/accounting');
    expect(screen.getByRole('link', { name: /user management/i })).toHaveAttribute('href', '/user-management');
  });

  it('should render children content', () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should render footer with copyright', () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );

    expect(screen.getByText(/© 2026 My Company/i)).toBeInTheDocument();
  });

  it('should have proper structure with header, main, and footer', () => {
    const { container } = render(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );

    const header = container.querySelector('header');
    const main = container.querySelector('main');
    const footer = container.querySelector('footer');

    expect(header).toBeInTheDocument();
    expect(main).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
  });

  it('should apply correct CSS classes', () => {
    const { container } = render(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );

    const rootDiv = container.firstChild;
    expect(rootDiv).toHaveClass('min-h-screen', 'flex', 'flex-col', 'bg-navy');
  });

  it('should render multiple children', () => {
    render(
      <Layout>
        <div>Child 1</div>
        <div>Child 2</div>
      </Layout>
    );

    expect(screen.getByText('Child 1')).toBeInTheDocument();
    expect(screen.getByText('Child 2')).toBeInTheDocument();
  });
});
