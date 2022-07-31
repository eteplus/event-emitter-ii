import { build } from 'vite';
import { resolve } from 'node:path';
import typescript from '@rollup/plugin-typescript';

const entry = resolve('src/index.ts');

const plugins = (formats = []) => {
  const options = {
    tsconfig: resolve('tsconfig.json'),
    sourceMap: false,
    include: ['src/**/*.ts'],
    compilerOptions: {
      target: 'es2018'
    },
    exclude: ['node_modules', 'test'],
  };

  if (formats.includes('es')) {
    options.compilerOptions = {
      ...options.compilerOptions,
      declaration: true,
      declarationDir: 'lib',
    };
  } else if (formats.includes('umd')) {
    options.compilerOptions = {
      target: 'es5',
    };
  }

  return [typescript(options)];
};

const libs = [
  {
    entry,
    formats: ['es'],
    fileName: () => 'index.mjs',
  },
  {
    entry,
    formats: ['cjs'],
    fileName: () => 'index.cjs',
  },
  {
    entry,
    name: 'EventEmitterII',
    formats: ['umd'],
    fileName: () => 'index.js',
  },
];

libs.forEach(async (lib) => {
  await build({
    configFile: false,
    build: {
      lib,
      outDir: 'lib',
      emptyOutDir: lib.formats.includes('es'),
      rollupOptions: {
        plugins: plugins(lib.formats),
      },
    },
  });
});
