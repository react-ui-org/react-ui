import vsDarkTheme from 'prism-react-renderer/themes/vsDark';

const codeMaxHeight = 'min(66vh, 1000px)';
const defaultFontFamily = '"Titillium Web", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';

export default {
  dest: 'docs',
  ignore: ['LICENSE.md', 'README.md'],
  menu: [
    'Home',
    {
      menu: [
        'Installation',
        'Usage',
      ],
      name: 'Getting Started',
    },
    {
      menu: [
        'Global Props',
        'Translations',
        'Theming',
      ],
      name: 'Customize',
    },
    {
      menu: [
        'Breakpoints',
        'Colors',
        'Typography',
        'Icons',
        'Spacing',
      ],
      name: 'Foundation',
    },
    'Components: UI',
    'Components: Layouts',
    {
      menu: [
        'Animation',
        'Box Alignment',
        'Colors',
        'Display',
        'Spacing',
        'Typography',
      ],
      name: 'CSS Helpers',
    },
    {
      menu: [
        'Guidelines',
        'Releasing',
      ],
      name: 'Contribute',
    },
  ],
  public: '/public',
  themeConfig: {
    colors: {
      modes: {
        dark: {
          text: '#ced4de',
        },
      },
    },
    prism: {
      dark: vsDarkTheme,
      light: vsDarkTheme,
    },
    styles: {
      Container: {
        '& > table': {
          fontSize: 'smaller',
        },
        '& [data-testid="live-preview"]': {
          fontSize: '1rem', // Set the font size in playground to override the docs theme default.
          p: 3,
        },
        '& [data-testid="live-preview"] > *:not(.example), & [data-testid="live-preview"] .example > *': {
          m: 1,
          maxWidth: ['-webkit-fill-available', '-moz-available'], // Fix overflowing full-width components in some browsers.
        },
        '& [data-testid="live-preview"] div ul': { // Reset lists in components.
          ml: 0,
        },
        '& [data-testid="playground"]': {
          my: '1.5rem !important',
        },
        '& [data-testid="playground"] > div:not(:only-of-type):last-of-type': { // Make code editor scrollable.
          maxHeight: codeMaxHeight,
          overflow: 'auto !important',
        },
        '& [data-testid="playground"] > span:last-child > div': { // Visually emphasize the resize bar.
          '&:hover, &:active': {
            borderRightColor: 'var(--rui-color-note)',
          },
          borderRight: '3px solid transparent',
          transition: 'border-color 200ms ease-in-out',
        },
        '& [data-testid="playground"] h3': { // Fix headings in modals.
          fontSize: 'var(--rui-typography-size-1)',
          m: 0,
        },
        '& [data-testid="playground"] pre': {
          maxHeight: 'none',
        },
        '& [data-testid="prop-name"]': {
          flexShrink: 0,
        },
        '.prism-code': {
          my: '1.5rem !important',
        },
        code: {
          bg: 'rgba(0, 0, 0, 0.05)',
        },
        h1: {
          fontFamily: defaultFontFamily,
          mb: 4,
        },
        'h1 + p': {
          fontSize: 4,
        },
        h2: {
          fontSize: 5,
          mb: 3,
          mt: 5,
        },
        h3: {
          fontSize: 4,
          mb: 2,
          mt: 4,
        },
        h4: {
          fontSize: 3,
          mb: 1,
          mt: 2,
        },
        hr: {
          my: 6,
        },
        maxWidth: 900,
        ol: {
          ml: 5,
        },
        p: null,
        pre: {
          maxHeight: codeMaxHeight,
        },
        px: 4,
        py: 6,
        ul: {
          ml: 5,
        },
      },
      Header: {
        'a:hover': {
          color: 'unset',
        },
      },
      a: {
        '&:hover': {
          color: 'var(--rui-link-hover-color)',
          textDecoration: 'var(--rui-link-hover-decoration)',
        },
        color: 'var(--rui-link-color)',
        textDecoration: 'var(--rui-link-decoration)',
      },
      root: {
        '--theme-ui-colors-playground-bg': 'rgba(179, 179, 179, 0.1)', // Make components with white background stand out.
        fontFamily: defaultFontFamily,
      },
    },
  },
  title: 'React UI',
};
