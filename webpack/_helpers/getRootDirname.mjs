import path from 'path';

/**
 * Get the root dirname of the project.
 *
 * @returns {string}
 */
export const getRootDirname = () => path.join(import.meta.dirname, '..', '..');
