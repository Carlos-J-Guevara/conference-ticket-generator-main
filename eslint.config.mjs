import { defineConfig } from 'eslint-define-config';
import typescript from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';

export default defineConfig([
  {
    ignores: ['node_modules/', 'dist/'],
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        browser: true,
        es2021: true
      }
    },
    plugins: {
      'prettier': prettier
    },
    rules: {
      ...eslintConfigPrettier.rules,
      'prettier/prettier': ['error', {
        endOfLine: 'auto'
      }]
    }
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json'
      }
    },
    plugins: {
      '@typescript-eslint': typescript,
      'prettier': prettier
    },
    rules: {
      ...typescript.configs.recommended.rules,
      ...eslintConfigPrettier.rules,
      '@typescript-eslint/no-explicit-any': 'error',
      'prettier/prettier': ['error', {
        endOfLine: 'auto'
      }]
    }
  }
]);