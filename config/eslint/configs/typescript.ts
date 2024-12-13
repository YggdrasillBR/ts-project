import globals from 'globals';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import ts from 'typescript-eslint';
import js from '@eslint/js';
import { postConfig, preConfig } from '../base.js';
import core from '../rules/core.js';
import importRules from '../rules/importRules.js';
import typescript from '../rules/typescript.js';
import { compat } from '../utils/compat.js';
import { mergeAll } from '../utils/mergeAllConfig.js';
import { merge } from '../utils/merge.js';
import jQueryUnsafeMalSync from '../plugins/jquery-unsafe-malsync/index.js';

const airbnb = merge(compat.extends('airbnb-base', 'airbnb-typescript/base'));

delete airbnb.languageOptions?.parserOptions?.ecmaFeatures?.globalReturn;

export default mergeAll(
  /** @type {import('eslint').Linter.FlatConfig[]} */ (
    jQueryUnsafeMalSync.configs?.recommended,
    ts.config(
      js.configs.recommended,
      airbnb,
      ...ts.configs.recommended,
      ...ts.configs.recommendedTypeChecked,
      merge(
        preConfig(),
        eslintPluginPrettierRecommended,
        core,
        importRules,
        typescript,
        postConfig(),
        /** @type {import('eslint').Linter.FlatConfig} */ ({
          languageOptions: {
            globals: {
              ...globals.node,
            },
            parserOptions: {
              sourceType: 'module',
            },
          },
        }),
      ),
    )
  ),
);
