require("esbuild")
  .build({
    entryPoints: ["src/index.js"],
    outdir: "dist",
    bundle: true,
    platform: "node",
  })
  .catch(() => process.exit(1));
