# Test Files Organization

All test files are now centralized in the `src/test/` directory for better organization and maintainability.

## 📁 Test Directory Structure

```
src/test/
├── setup.ts                          # Vitest setup & global mocks
├── utils.tsx                         # Test utilities & custom render function
├── App.test.tsx                      # App component unit tests (6 tests)
├── AppRoutes.test.tsx                # Routing unit tests (8 tests)
├── Home.test.tsx                     # Home page unit tests (11 tests)
├── Layout.test.tsx                   # Layout component unit tests (8 tests)
├── MFEErrorBoundary.test.tsx         # Error boundary unit tests (6 tests)
└── integration/
    └── navigation.test.tsx           # Integration tests (8 tests)
```

## 📊 Test Coverage Summary

### Unit Tests (5 files - 39 tests total)

**`App.test.tsx`** - 6 tests
- ✅ Render without crashing
- ✅ Loading fallback
- ✅ AppRoutes rendering
- ✅ BrowserRouter wrapper
- ✅ Suspense behavior
- ✅ Application structure

**`AppRoutes.test.tsx`** - 8 tests
- ✅ Home component on root path
- ✅ Dashboard MFE on /dashboard
- ✅ Accounting MFE on /accounting
- ✅ User Management MFE on /user-management
- ✅ Layout wrapper
- ✅ Nested routes (/dashboard/*)
- ✅ Accounting nested routes
- ✅ User management nested routes

**`Home.test.tsx`** - 11 tests
- ✅ Welcome heading
- ✅ Subtitle text
- ✅ All three MFE tiles
- ✅ Tile descriptions
- ✅ Icons for each tile
- ✅ Go buttons
- ✅ Dashboard navigation
- ✅ Accounting navigation
- ✅ User Management navigation
- ✅ Tile click behavior

**`Layout.test.tsx`** - 8 tests
- ✅ Portal title in header
- ✅ All navigation links
- ✅ Correct href attributes
- ✅ Children content rendering
- ✅ Footer with copyright
- ✅ Proper HTML structure (header/main/footer)
- ✅ Correct CSS classes
- ✅ Multiple children support

**`MFEErrorBoundary.test.tsx`** - 6 tests
- ✅ Render children when no error
- ✅ Render error message on error
- ✅ Error UI styling
- ✅ Error catching from children
- ✅ Multiple children handling
- ✅ No children rendered on error

### Integration Tests (1 file - 8 tests total)

**`navigation.test.tsx`** - 8 tests
- ✅ Home → Dashboard navigation flow
- ✅ Home → Accounting navigation flow
- ✅ Home → User Management navigation flow
- ✅ Layout persistence across routes
- ✅ Navigate back to home from MFE
- ✅ Navigate between different MFEs
- ✅ All navigation links visible
- ✅ Direct URL navigation to MFEs

## 🚀 Running Tests

```bash
# Run all tests
npm test

# Run all tests in watch mode
npm run test:watch

# Run tests with interactive UI
npm run test:ui

# Run tests with coverage report
npm run test:coverage

# Run tests once (CI mode)
npm run test:run

# Run specific test file
npm test -- App.test.tsx

# Run tests matching pattern
npm test -- -t "should render"
```

## 📝 Import Patterns

All test files use consistent imports:

```typescript
// For unit tests
import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from './utils';  // Uses custom render
import ComponentToTest from '../path/to/Component';

// For integration tests
import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '../utils';
import { MemoryRouter } from 'react-router-dom';
```

## 🔧 Test Utilities

**`setup.ts`**
- Global test setup
- Cleanup after each test
- Mock window.matchMedia
- Configure testing-library/jest-dom

**`utils.tsx`**
- Custom render function with BrowserRouter
- Re-exports testing-library utilities
- User event setup
- Consistent test providers

## ✅ Best Practices

1. **All tests in one location** - Easy to find and maintain
2. **Consistent naming** - `ComponentName.test.tsx`
3. **Proper imports** - Use relative paths from test directory
4. **Integration tests separated** - In `integration/` subdirectory
5. **Mock external dependencies** - MFE remotes, router, etc.
6. **Clean up after tests** - Automatic via setup.ts
7. **Descriptive test names** - Clear "should" statements

## 📦 Total Test Coverage

- **Total Files**: 6 test files
- **Total Tests**: 47 test cases
- **Unit Tests**: 39 tests
- **Integration Tests**: 8 tests
- **Coverage Goal**: >80% for all metrics

## 🐛 Common Issues & Solutions

**Issue**: Import errors
**Solution**: Use relative paths from `src/test/` directory

**Issue**: Tests timing out
**Solution**: Use `waitFor` for async operations

**Issue**: Mock not working
**Solution**: Ensure mocks are defined before imports

**Issue**: Tests passing locally but failing in CI
**Solution**: Check for environment-specific issues, ensure dependencies installed

## 📚 Related Files

- `vitest.config.ts` - Vitest configuration
- `TESTING.md` - Detailed testing guide
- `package.json` - Test scripts
