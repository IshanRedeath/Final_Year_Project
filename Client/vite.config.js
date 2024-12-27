import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import jsconfigPaths from 'vite-jsconfig-paths';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), jsconfigPaths()],
  // resolve: {
  //   alias: {
  //     '': path.resolve(__dirname, './src'), // Alias '@' to 'src' folder
  //   },
  // },
  resolve: {
    alias: [
      {
        find: /^~(.+)/,
        replacement: path.join(process.cwd(), 'node_modules/$1'),
      },
      {
        find: /^src(.+)/,
        replacement: path.join(process.cwd(), 'src/$1'),
      },
    ],
  },
});
