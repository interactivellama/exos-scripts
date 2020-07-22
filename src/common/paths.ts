import path from 'path';

const ROOT_PATH = path.resolve(process.cwd());
const NODE_MODULES_PATH = path.resolve(ROOT_PATH, 'node_modules');
const CONFIG_PATH = path.resolve(ROOT_PATH, 'exos.config.js');
const SOURCE_PATH = path.resolve(ROOT_PATH, 'src');
const ASSETS_PATH = path.resolve(ROOT_PATH, 'public');
const OUTPUT_PATH = path.resolve(ROOT_PATH, 'dist');
const OUTPUT_PUBLIC_PATH = '/';

export {
  ROOT_PATH,
  NODE_MODULES_PATH,
  CONFIG_PATH,
  SOURCE_PATH,
  ASSETS_PATH,
  OUTPUT_PATH,
  OUTPUT_PUBLIC_PATH,
};
