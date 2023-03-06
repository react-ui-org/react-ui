import vsDarkTheme from 'prism-react-renderer/themes/vsDark';

const codeMaxHeight = 'min(66vh, 1000px)';
const defaultFontFamily = '"Titillium Web", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';

export default {
  dest: 'docs',
  groups: {
    '': [],
    Basics: [
      'Getting Started',
      'Foundation',
    ],
    Components: [
      'Actions',
      'Inputs',
      'Layouts',
      'Miscellaneous',
    ],
    Helpers: [
      'CSS Helpers',
      'JS Helpers',
    ],
    // eslint-disable-next-line sort-keys
    Guides: [
      'Customize',
      'Contribute',
    ],
  },
  ignore: ['LICENSE.md', 'README.md'],
  lang: 'en',
  menu: [
    'Introduction',
    {
      menu: [
        'Installation',
        'Usage',
        'Browsers & Devices',
      ],
      name: 'Getting Started',
    },
    {
      menu: [
        'Design Tokens',
        'Colors',
        'Typography',
        'Spacing',
        'Borders',
        'Shadows',
        'Breakpoints',
        'Accessibility',
        'Icons',
      ],
      name: 'Foundation',
    },
    {
      menu: [],
      name: 'Actions',
    },
    {
      menu: [],
      name: 'Inputs',
    },
    {
      menu: [],
      name: 'Layouts',
    },
    {
      menu: [],
      name: 'Miscellaneous',
    },
    {
      menu: [],
      name: 'CSS Helpers',
    },
    {
      menu: [],
      name: 'JS Helpers',
    },
    {
      menu: [
        'Theming Overview', // Theming submenu
        'Forms Theming', // Theming submenu
        'Global Props',
        'Translations',
      ],
      name: 'Customize',
    },
    {
      menu: [
        'General Guidelines',
        'API Guidelines',
        'Composition',
        'CSS Guidelines',
        'Releasing',
      ],
      name: 'Contribute',
    },
  ],
  // Use short menu items while keeping page title descriptive.
  menuDisplayName: {
    'Forms Theming': 'Forms',
    'Theming Overview': 'Overview',
  },
  public: '/public',
  themeConfig: {
    colors: {
      modes: {
        dark: {
          text: '#ced4de',
        },
      },
    },
    editor: {
      fontSize: 1,
    },
    fonts: {
      monospace: 'var(--rui-font-family-monospace)',
    },
    footer: {
      navigation: true,
    },
    header: {
      fixed: false,
      icons: 'minimal',
    },
    menu: {
      headings: {
        rightSide: true,
      },
      search: false,
    },
    prism: {
      dark: vsDarkTheme,
      light: vsDarkTheme,
    },
    search: true,
    showPlaygroundEditor: false,
    styles: {
      Container: {
        '& > div > div > div > :is(ul, ol)': {
          ml: 5,
        },
        '& > div > div > div > h1': {
          fontFamily: defaultFontFamily,
          mb: 4,
        },
        '& > div > div > div > h2': {
          fontSize: 5,
          mb: 3,
          mt: 5,
        },
        '& > div > div > div > h3': {
          fontSize: 4,
          mb: 2,
          mt: 4,
        },
        '& > div > div > div > h4': {
          fontSize: 3,
          mb: 1,
          mt: 2,
        },
        '& [data-testid="live-preview"]': {
          fontSize: '1rem', // Set the font size in playground to override the docs theme default.
          overflow: 'auto', // Make preview scrollable.
          p: 3,
        },
        '& [data-testid="live-preview"] * ul': { // Reset lists in components.
          ml: 0,
        },
        '& [data-testid="live-preview"] > *:not(.example), & [data-testid="live-preview"] .example > *': {
          m: 1,
          maxWidth: ['-webkit-fill-available', '-moz-available'], // Fix overflowing full-width components in some browsers.
        },
        '& [data-testid="playground"]': {
          my: '1.5rem !important',
        },
        '& [data-testid="playground"] > div:last-child > div': { // Visually emphasize the resize bar.
          '&:hover, &:active': {
            borderRightColor: 'var(--rui-color-action-selected)',
          },
          borderRight: '3px solid transparent',
          transition: 'border-color 200ms ease-in-out',
        },
        '& [data-testid="playground"] > div[class$="NormalWrapper"]': { // Make code editor scrollable.
          maxHeight: codeMaxHeight,
          overflow: 'auto !important',
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
        blockquote: {
          fontStyle: 'normal',
        },
        code: {
          bg: 'rgba(0, 0, 0, 0.05)',
        },
        'code, pre': {
          fontSize: '80%', // Adjust code font size to work better with 20px body text size.
        },
        'h1 + p': {
          fontSize: 4,
        },
        hr: {
          my: 6,
        },
        maxWidth: 1150,
        p: null,
        pre: {
          maxHeight: codeMaxHeight,
        },
        px: 4,
        py: 6,
        table: {
          fontSize: 'var(--rui-font-size-1)',
          minWidth: '0 !important',
        },
        'table tbody td:first-child': {
          fontWeight: 'bold', // Emphasize prop names.
        },
        'table tbody td:first-child code': {
          fontWeight: 'initial', // Revert previously set emphasize for custom property names.
        },
        'table tbody td:nth-child(2) code': {
          whiteSpace: 'pre-wrap', // Preserve formatting for prop types, wrap lines when necessary.
        },
        'table td p:not(:last-child)': {
          mb: 3,
        },
        'table ul, table ol': {
          ml: 1,
        },
      },
      Header: {
        'a:hover': {
          color: 'unset',
        },
      },
      a: {
        '&:active': {
          color: 'var(--rui-color-text-link-active)',
          textDecoration: 'var(--rui-text-decoration-link-active)',
        },
        '&:hover': {
          color: 'var(--rui-color-text-link-hover)',
          textDecoration: 'var(--rui-text-decoration-link-hover)',
        },
        color: 'var(--rui-color-text-link)',
        textDecoration: 'var(--rui-text-decoration-link)',
      },
      root: {
        '--theme-ui-colors-playground-bg': 'rgba(179, 179, 179, 0.1)', // Make components with white background stand out.
        fontFamily: defaultFontFamily,
      },
    },
  },
  title: 'React UI',
};
