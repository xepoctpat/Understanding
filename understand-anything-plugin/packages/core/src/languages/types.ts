import { z } from "zod";

// Tree-sitter node type mappings for a language
export const TreeSitterConfigSchema = z.object({
  wasmPackage: z.string(),
  wasmFile: z.string(),
  nodeTypes: z.object({
    function: z.array(z.string()),
    class: z.array(z.string()),
    import: z.array(z.string()),
    export: z.array(z.string()),
    call: z.array(z.string()),
    string: z.array(z.string()),
    parameter: z.array(z.string()),
  }),
});

export type TreeSitterConfig = z.infer<typeof TreeSitterConfigSchema>;

// File pattern conventions for a language
export const FilePatternConfigSchema = z.object({
  entryPoints: z.array(z.string()),
  barrels: z.array(z.string()),
  tests: z.array(z.string()),
  config: z.array(z.string()),
});

export type FilePatternConfig = z.infer<typeof FilePatternConfigSchema>;

// Complete language configuration
export const LanguageConfigSchema = z.object({
  id: z.string().min(1),
  displayName: z.string().min(1),
  extensions: z.array(z.string()).min(1),
  treeSitter: TreeSitterConfigSchema.optional(),
  concepts: z.array(z.string()),
  filePatterns: FilePatternConfigSchema,
});

export type LanguageConfig = z.infer<typeof LanguageConfigSchema>;

// Framework configuration
export const FrameworkConfigSchema = z.object({
  id: z.string().min(1),
  displayName: z.string().min(1),
  language: z.string().min(1),
  detectionKeywords: z.array(z.string()).min(1),
  manifestFiles: z.array(z.string()).min(1),
  promptSnippetPath: z.string().min(1),
  entryPoints: z.array(z.string()).optional(),
  layerHints: z.record(z.string(), z.string()).optional(),
});

export type FrameworkConfig = z.infer<typeof FrameworkConfigSchema>;
