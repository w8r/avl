import { defineConfig } from "vite";
import { resolve } from "path";

import {
  name as moduleName,
  version,
  description,
  author,
  license,
} from "./package.json";

const banner = `\
/**
 * ${moduleName} v${version}
 * ${description}
 *
 * @author ${author}
 * @license ${license}
 * @preserve
 */
`;

export default defineConfig({
  build: {
    target: "es6",
    rollupOptions: {
      output: {
        banner,
      },
    },
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "avltree",
      formats: ["es", "umd", "cjs"],
      fileName: (format) =>
        `index.${{ es: "mjs", umd: "js", cjs: "cjs" }[format]}`,
    },
    minify: false,
  },

  test: {
    include: ["tests/**/*.test.ts"],
  },
});
