# Host App Test Suite

This directory contains comprehensive unit and integration tests for the MFE Host Application.

## 📦 Test Structure

```
src/
├── test/
│   ├── setup.ts                      # Vitest setup & global mocks
│   ├── utils.tsx                     # Test utilities & custom render
│   └── integration/
│       └── navigation.test.tsx       # Integration tests
├── layout/
│   └── Layout.test.tsx               # Layout component unit tests
├── pages/
│   └── Home.test.tsx                 # Home page unit tests
├── components/
│   └── MFEErrorBoundary.test.tsx     # Error boundary unit tests
├── router/
│   └── AppRoutes.test.tsx            # Routing unit tests
└── App.test.tsx                      # Main App unit tests
```

## 🧪 Test Categories

### Unit Tests (5 files, ~40 test cases)
- **Layout.test.tsx** - Tests layout component, navigation, header, footer
- **Home.test.tsx** - Tests home page, MFE tiles, navigation clicks
- **MFEErrorBoundary.test.tsx** - Tests error boundary fallback UI
- **AppRoutes.test.tsx** - Tests route matching and MFE loading
- **App.test.tsx** - Tests main app structure and suspense

### Integration Tests (1 file, ~8 test cases)
- **navigation.test.tsx** - Tests end-to-end navigation flows
  - Home → Dashboard navigation
  - Home → Accounting navigation
  - Home → User Management navigation
  - Layout persistence across routes
  - Direct URL navigation
  - Cross-MFE navigation

## 🚀 Running Tests

### Install Dependencies First
```bash
npm install -D vitest @vitest/ui @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

### Run All Tests
```bash
npm test
```

### Run Tests in Watch Mode
```bash
npm run test:watch
```

### Run Tests with UI
```bash
npm run test:ui
```

### Run Tests with Coverage
```bash
npm run test:coverage
```

### Run Tests Once (CI Mode)
```bash
npm run test:run
```

## 📊 Coverage Goals

- **Statements**: > 80%
- **Branches**: > 75%
- **Functions**: > 80%
- **Lines**: > 80%

## 🔧 Test Configuration

Tests are configured in `vitest.config.ts`:
- Environment: jsdom (browser-like)
- Globals: true (describe, it, expect available globally)
- Setup: `src/test/setup.ts`
- CSS Modules: Supported

## 📝 Writing New Tests

### Unit Test Example
```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '../test/utils';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('should render correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

### Integration Test Example
```typescript
import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '../test/utils';
import { MemoryRouter } from 'react-router-dom';

describe('Feature Flow', () => {
  it('should complete user flow', async () => {
    const { user } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    const button = screen.getByRole('button');
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText('Success')).toBeInTheDocument();
    });
  });
});
```

## 🐛 Debugging Tests

### Run Specific Test File
```bash
npm test -- Layout.test.tsx
```

### Run Tests Matching Pattern
```bash
npm test -- -t "should render"
```

### Debug in VS Code
Add breakpoint and use "JavaScript Debug Terminal"

## ✅ Test Checklist

Before committing:
- [ ] All tests pass
- [ ] Coverage is above 80%
- [ ] No console errors/warnings
- [ ] Tests are isolated (no dependencies)
- [ ] Mocks are properly cleaned up

## 🔗 Related Documentation

- [Vitest Docs](https://vitest.dev/)
- [Testing Library](https://testing-library.com/react)
- [React Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
