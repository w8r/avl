import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
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
  plugins: [
    // dts({
    //   rollupTypes: true,
    //   tsconfigPath: "./tsconfig.json",
    // }),
  ],
  build: {
    target: "esnext",
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
  },

  test: {
    include: ["tests/**/*.test.ts"],
  },
});
