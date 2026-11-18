import path from 'path';
import { getRootDirname } from '../_helpers/getRootDirname.mjs';

/** @typedef { import("webpack").Configuration.entry } WebpackEntryConfig * */

/**
 * @return {WebpackEntryConfig}
 */
export const entryConfig = () => ({
  'docs-custom-properties': path.join(getRootDirname(), 'src/docsCustomProperties.ts'),
  'react-ui': path.join(getRootDirname(), 'src/index.ts'),
});
