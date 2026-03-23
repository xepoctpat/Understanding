import type { FrameworkConfig } from "../types.js";

export const springConfig = {
  id: "spring",
  displayName: "Spring Boot",
  language: "java",
  detectionKeywords: [
    "spring-boot",
    "spring-boot-starter",
    "spring-web",
    "spring-data",
    "org.springframework",
  ],
  manifestFiles: ["pom.xml", "build.gradle", "build.gradle.kts"],
  promptSnippetPath: "./frameworks/spring.md",
  entryPoints: ["**/Application.java", "**/App.java"],
  layerHints: {
    controller: "api",
    service: "service",
    repository: "data",
    model: "data",
    entity: "data",
    config: "config",
    dto: "types",
    security: "middleware",
  },
} satisfies FrameworkConfig;
