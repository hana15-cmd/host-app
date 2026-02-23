import React from "react";

export default class MFEErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-red-500 text-center py-6">
          Failed to load module.
        </div>
      );
    }

    return this.props.children;
  }
}