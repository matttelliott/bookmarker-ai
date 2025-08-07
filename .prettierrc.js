export default {
  // Line length and wrapping
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,

  // Semicolons and quotes
  semi: false,
  singleQuote: true,
  quoteProps: 'consistent',

  // Trailing commas everywhere possible for cleaner diffs
  trailingComma: 'all',

  // Spacing
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'always',

  // Formatting
  proseWrap: 'always',
  endOfLine: 'lf',

  // Range formatting (format entire file)
  rangeStart: 0,
  rangeEnd: Infinity,

  // Require pragma to format (set to true to only format files with @prettier comment)
  requirePragma: false,
  insertPragma: false,

  // HTML/JSX specific
  htmlWhitespaceSensitivity: 'strict',

  // Experimental ternary formatting
  experimentalTernaries: true,

  // Import sorting (when used with prettier-plugin-sort-imports)
  // We'll add this plugin later if needed
}
