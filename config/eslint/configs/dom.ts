/* eslint-disable es-x/no-import-meta */
// @ts-nocheck
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FlatCompat } from '@eslint/eslintrc';
import globals from 'globals';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import { postConfig, preConfig } from '../base.js';
import core from '../rules/core.js';
import { merge } from '../utils/merge.js';
import { mergeAll } from '../utils/mergeAllConfig.js';
import jQueryUnsafeMalSync from '../plugins/jquery-unsafe-malsync/index.js';
import noUnsanitizedRules from '../rules/no-unsanitized.js';
import importRules from '../rules/importRules.js';

const compat = new FlatCompat({
  baseDirectory: dirname(fileURLToPath(import.meta.url)),
});

export default mergeAll(
  /** @type {import('eslint').Linter.FlatConfig<import('eslint').Linter.RulesRecord>[]} */ (
    jQueryUnsafeMalSync.configs?.recommended || []
  ),
  [
    merge(
      //
      mergeAll(compat.extends('eslint-config-airbnb-base')),
      preConfig(),
      eslintPluginPrettierRecommended,
      core,
      importRules,
      noUnsanitizedRules,
      postConfig(),
      {
        languageOptions: {
          globals: {
            ...globals.browser,
          },
        },
      },
    ),
  ],
);
