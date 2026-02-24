import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from './utils';
import MFEErrorBoundary from '../components/MFEErrorBoundary';

const ThrowError = ({ shouldThrow = true }: { shouldThrow?: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <div>Normal Content</div>;
};

describe('MFEErrorBoundary', () => {
  beforeEach(() => {
    // Suppress console.error for these tests
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render children when there is no error', () => {
    render(
      <MFEErrorBoundary>
        <div>Test Content</div>
      </MFEErrorBoundary>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should render error message when error occurs', () => {
    render(
      <MFEErrorBoundary>
        <ThrowError />
      </MFEErrorBoundary>
    );

    expect(screen.getByText(/failed to load module/i)).toBeInTheDocument();
  });

  it('should display error boundary UI with proper styling', () => {
    const { container } = render(
      <MFEErrorBoundary>
        <ThrowError />
      </MFEErrorBoundary>
    );

    const errorDiv = container.querySelector('.text-red-500');
    expect(errorDiv).toBeInTheDocument();
  });

  it('should catch errors from child components', () => {
    render(
      <MFEErrorBoundary>
        <ThrowError />
      </MFEErrorBoundary>
    );

    // Should show error message instead of crashing
    expect(screen.getByText(/failed to load module/i)).toBeInTheDocument();
    // Should not show the normal content
    expect(screen.queryByText('Normal Content')).not.toBeInTheDocument();
  });

  it('should handle multiple children when no error', () => {
    render(
      <MFEErrorBoundary>
        <div>Child 1</div>
        <div>Child 2</div>
      </MFEErrorBoundary>
    );

    expect(screen.getByText('Child 1')).toBeInTheDocument();
    expect(screen.getByText('Child 2')).toBeInTheDocument();
  });

  it('should not render children when error boundary is triggered', () => {
    render(
      <MFEErrorBoundary>
        <ThrowError />
        <div>Should not be visible</div>
      </MFEErrorBoundary>
    );

    expect(screen.queryByText('Should not be visible')).not.toBeInTheDocument();
  });
});
