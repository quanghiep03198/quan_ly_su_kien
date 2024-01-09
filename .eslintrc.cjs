module.exports = {
   root: true,
   env: { browser: true, es2020: true },
   extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react-hooks/recommended'],
   ignorePatterns: ['dist', '.eslintrc.cjs'],
   parser: '@typescript-eslint/parser',
   plugins: ['react-refresh'],
   rules: {
      'no-unused-vars': 'warn',
      'react/jsx-uses-react': 'off',
      'react/jsx-uses-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/ban-types': 'warn',
      'prefer-spread': 'off',
      'no-sparse-arrays': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      'no-unsafe-optional-chaining': 'warn',
      '@typescript-eslint/no-explicit-any': 'off',
      'react-hooks/exhaustive-deps': 'warn',
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'warn',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      '@typescript-eslint/no-restricted-imports': [
         'off',
         {
            name: 'react-redux',
            importNames: ['useSelector', 'useDispatch'],
            message: 'Use typed hooks `useAppDispatch` and `useAppSelector` instead.'
         }
      ]
   }
}
