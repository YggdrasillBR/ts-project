/* eslint-disable es-x/no-import-meta */
import globals from 'globals';
import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import { postConfig, preConfig } from '../base.js';
import core from '../rules/core.js';
import importRules from '../rules/importRules.js';
import prettier from '../rules/prettier.js';
import { merge } from '../utils/merge.js';
import { mergeAll } from '../utils/mergeAllConfig.js';

const compat = new FlatCompat({
  baseDirectory: dirname(fileURLToPath(import.meta.url)),
});

export default merge(
  mergeAll(compat.extends('eslint-config-airbnb-base')),
  eslintPluginPrettierRecommended,
  preConfig(),
  core,
  importRules,
  prettier,
  postConfig(),
  /** @type {import('eslint').Linter.FlatConfig} */ ({
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  }),
);
