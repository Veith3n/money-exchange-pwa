import { CracoConfig } from '@craco/types';
import path from 'path';

const config: CracoConfig = {
  webpack: {
    alias: {
      '@common': path.resolve(__dirname, 'src/common'),
      '@components': path.resolve(__dirname, 'src/components'),
    },
  },
};

export default config;
