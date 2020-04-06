module.exports = {
  plugins: [
    {
      options: {
        cssLoaderOptions: {
          localIdentName: '[name]__[local]__[hash:base64:8]',
        },
        sassRuleModulesTest: /\.scss$/,
      },
      resolve: 'gatsby-plugin-sass',
    }, {
      options: {
        files: '**/*.{md,mdx}',
        title: 'React UI',
      },
      resolve: 'gatsby-theme-docz',
    },
  ],
};
