import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import pkg from "./package.json" assert { type: "json" };
import svgr from "@svgr/rollup";
import url from "@rollup/plugin-url";

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: pkg.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: pkg.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      postcss({
        extensions: [".css", ".scss"],
        plugins: [],
      }),
      svgr(),
      url({
        include: ["**/*.svg"],
        limit: 8192, // inline files < 8kb, copy others
        emitFiles: true,
        fileName: "assets/[name][extname]",
      }),
    ],
  },
];
