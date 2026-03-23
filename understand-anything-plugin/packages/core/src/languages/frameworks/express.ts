import type { FrameworkConfig } from "../types.js";

export const expressConfig = {
  id: "express",
  displayName: "Express",
  language: "javascript",
  detectionKeywords: ["express", "express-validator", "cors", "body-parser"],
  manifestFiles: ["package.json"],
  promptSnippetPath: "./frameworks/express.md",
  entryPoints: [
    "src/index.js",
    "src/app.js",
    "server.js",
    "app.js",
    "src/index.ts",
    "src/app.ts",
  ],
  layerHints: {
    routes: "api",
    controllers: "service",
    models: "data",
    middleware: "middleware",
    services: "service",
    db: "data",
  },
} satisfies FrameworkConfig;
