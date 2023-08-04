# Browsers & Devices

React UI supports the **latest, stable releases** of major browsers and
platforms.

Alternative browsers which use the latest version of WebKit, Blink, or Gecko,
whether directly or via the platform's web view API, are not explicitly
supported. However, React UI should (in most cases) display and function
correctly in these browsers as well.

We use [Autoprefixer](https://autoprefixer.github.io) and
[Babel](https://babeljs.io) to handle intended browser support, which use
[Browserslist](https://github.com/browserslist/browserslist) to manage these
browser versions. See the source of our `.browserslistrc` config to learn how.

## Mobile Devices

|         | Chrome | Firefox | Safari |
|---------|--------|---------|--------|
| Android | ✅     | ✅      | —      |
| iOS     | ✅     | ✅      | ✅     |

## Desktop Browsers

|         | Chrome | Firefox | Safari | Microsoft Edge |
|---------|--------|---------|--------|----------------|
| Windows | ✅     | ✅      | —      | ✅             |
| macOS   | ✅     | ✅      | ✅     | ✅             |
| Linux   | ✅     | ✅      | —      | —              |

To be explicit: Internet Explorer is not supported.
