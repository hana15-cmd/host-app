import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: {
      modules: {
        classNameStrategy: 'non-scoped',
      },
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.*',
        'dist/',
        '**/*.test.{ts,tsx}',
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'remote_app/App': path.resolve(__dirname, './src/test/__mocks__/RemoteApp.tsx'),
      'mfe_accounting_app/App': path.resolve(__dirname, './src/test/__mocks__/AccountingApp.tsx'),
      'user_management_app/App': path.resolve(__dirname, './src/test/__mocks__/UserManagementApp.tsx'),
    },
  },
});
