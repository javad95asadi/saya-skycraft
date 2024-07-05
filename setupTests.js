module.exports = {

    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'esm'],
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
      '^.+\\.esm$': 'jest-esm-transformer',
    },
    moduleDirectories: ['node_modules'],

  };