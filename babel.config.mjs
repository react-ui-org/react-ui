import corejsPackage from 'core-js/package.json' with { type: 'json' };

export default {
  overrides: [
    {
      // JSX is parsed only in `.tsx` (and `.js`/`.jsx`), like `tsc` does: in `.ts` files, generic arrow
      // functions (`<T>(value: T) => ...`) and type assertions (`<Type>value`) would be read as JSX tags
      exclude: /\.ts$/,
      presets: [
        [
          '@babel/preset-react',
          {
            runtime: 'classic',
          },
        ],
      ],
    },
  ],
  plugins: [
    [
      'babel-plugin-polyfill-corejs3',
      {
        method: 'usage-global',
        version: corejsPackage.version,
      },
    ],
  ],
  presets: [
    '@babel/preset-env',
    '@babel/preset-typescript',
  ],
};
