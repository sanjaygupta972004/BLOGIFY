import react from '@vitejs/plugin-react-swc';
import { esbuildCommonjs } from '@originjs/vite-plugin-commonjs';
import commonjs from '@rollup/plugin-commonjs';
import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';


export default defineConfig({
    optimizeDeps: {
      esbuildOptions: {
         define: {
         global: 'globalThis', // Ensure globalThis is used
        'process.env.NODE_ENV': JSON.stringify('development'), // Define NODE_ENV
      },
      plugins:[
          esbuildCommonjs(["DataStream", "buffer", "stream", "utils"]),
          NodeGlobalsPolyfillPlugin({
          buffer: true,
          process: true,
          global: true, 
       
        }),
        NodeModulesPolyfillPlugin()
      ],
    }
  },
  resolve: {
    alias: {
      buffer: 'buffer/'
    }
  },
    server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      }
    },
    hmr: {
      port: 5173,
      clientPort: 5173,
      host: 'localhost'
    },
  },
 

});
