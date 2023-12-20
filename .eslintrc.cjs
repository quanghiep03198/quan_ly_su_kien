module.exports = {
   root: true,
   env: { browser: true, es2020: true },
   extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react-hooks/recommended'],
   ignorePatterns: ['dist', '.eslintrc.cjs'],
   parser: '@typescript-eslint/parser',
   plugins: ['react-refresh'],
   rules: {
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      '@typescript-eslint/no-restricted-imports': [
         'warn',
         {
            name: 'react-redux',
            importNames: ['useSelector', 'useDispatch'],
            message: 'Use typed hooks `useAppDispatch` and `useAppSelector` instead.'
         }
      ],
      'prettier/prettier': [
         'warn',
         {
            arrowParens: 'always',
            semi: false,
            trailingComma: 'none',
            tabWidth: 3,
            endOfLine: 'auto',
            bracketSameLine: false,
            useTabs: false,
            singleQuote: true,
            printWidth: 160,
            jsxSingleQuote: true
         }
      ]
   }
}
