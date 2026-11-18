import path from 'path';
import { getRootDirname } from '../_helpers/getRootDirname.mjs';

/** @typedef { import("webpack").Configuration.output } WebpackOutputConfig * */

/**
 * @param {Environment} environment
 * @return {WebpackOutputConfig}
 */
export const outputConfig = (environment) => ({
  filename: environment.WEBPACK_MODE === 'production'
    ? '[name].js'
    : '[name].development.js',
  libraryTarget: 'umd',
  path: path.join(getRootDirname(), 'src/docs/_assets/generated/'),
});
