import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    rules: {
      'object-shorthand': 'warn',
      '@next/next/no-img-element': 'off',
      // Hier ggf. in ignore Attribute aufzählen, die React nicht kennt
      'react/no-unknown-property': ['error', { ignore: [] }],
    },
  },
];

export default eslintConfig;
