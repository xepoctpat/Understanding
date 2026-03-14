import { create } from "zustand";
import type { KnowledgeGraph } from "@understand-anything/core";

interface DashboardStore {
  graph: KnowledgeGraph | null;
  selectedNodeId: string | null;
  searchQuery: string;
  searchResults: string[]; // node IDs

  setGraph: (graph: KnowledgeGraph) => void;
  selectNode: (nodeId: string | null) => void;
  setSearchQuery: (query: string) => void;
}

export const useDashboardStore = create<DashboardStore>()((set, get) => ({
  graph: null,
  selectedNodeId: null,
  searchQuery: "",
  searchResults: [],

  setGraph: (graph) => set({ graph }),
  selectNode: (nodeId) => set({ selectedNodeId: nodeId }),
  setSearchQuery: (query) => {
    const graph = get().graph;
    if (!graph || !query.trim()) {
      set({ searchQuery: query, searchResults: [] });
      return;
    }
    const lower = query.toLowerCase();
    const results = graph.nodes
      .filter(
        (node) =>
          node.name.toLowerCase().includes(lower) ||
          node.summary.toLowerCase().includes(lower) ||
          node.tags.some((tag) => tag.toLowerCase().includes(lower)),
      )
      .map((n) => n.id);
    set({ searchQuery: query, searchResults: results });
  },
}));
