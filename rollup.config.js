import terser from "@rollup/plugin-terser"

export default [
  {
    input: "src/index.js",
    output: {
      file: "dist/ui5.js",
      format: "es",
    },
  },
  {
    input: "src/index.js",
    plugins: [terser()],
    output: {
      file: "dist/ui5.min.js",
      format: "es",
    },
  },
  {
    input: "src/index.js",
    output: {
      dir: "cjs",
      format: "cjs",
      preserveModules: true,
    },
  },
]
