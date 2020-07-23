import type webpack from 'webpack';

export default (isLibrary: boolean): webpack.ExternalsElement => {
  if (isLibrary) {
    // UMD only supports an object
    return {
      react: {
        amd: 'react',
        commonjs: 'react',
        commonjs2: 'react',
        root: 'React',
      },
      'react-dom': {
        amd: 'react-dom',
        commonjs: 'react-dom',
        commonjs2: 'react-dom',
        root: 'ReactDOM',
      },
    };
  }

  return {
    react: 'React',
    'react-dom': 'ReactDOM',
  };
};
