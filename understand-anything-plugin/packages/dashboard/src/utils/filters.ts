import type { GraphNode, GraphEdge } from "@understand-anything/core/types";
import type { FilterState, NodeType, Complexity, EdgeCategory } from "../store";
import { EDGE_CATEGORY_MAP } from "../store";

/**
 * Filter nodes based on active filters.
 *
 * Pass `nodeIdToLayerId` from the store (precomputed once on `setGraph`)
 * so the layer-membership check is O(1) per node. The previous shape took
 * `Layer[]` and ran `layer.nodeIds.includes(node.id)` per node-per-layer,
 * which was O(N × L × K) and dominated export time on large graphs (#102).
 */
export function filterNodes(
  nodes: GraphNode[],
  nodeIdToLayerId: Map<string, string>,
  filters: FilterState,
): GraphNode[] {
  const hasLayerFilter = filters.layerIds.size > 0;
  return nodes.filter((node) => {
    // Filter by node type
    if (!filters.nodeTypes.has(node.type as NodeType)) {
      return false;
    }

    // Filter by complexity
    if (node.complexity && !filters.complexities.has(node.complexity as Complexity)) {
      return false;
    }

    // Filter by layer (if any layers are selected)
    if (hasLayerFilter) {
      const layerId = nodeIdToLayerId.get(node.id);
      if (!layerId || !filters.layerIds.has(layerId)) {
        return false;
      }
    }

    return true;
  });
}

/**
 * Filter edges based on visible nodes and active edge category filters
 */
export function filterEdges(
  edges: GraphEdge[],
  visibleNodeIds: Set<string>,
  filters: FilterState,
): GraphEdge[] {
  return edges.filter((edge) => {
    // Only keep edges between visible nodes
    if (!visibleNodeIds.has(edge.source) || !visibleNodeIds.has(edge.target)) {
      return false;
    }

    // Filter by edge category
    const edgeCategory = getEdgeCategory(edge.type);
    if (edgeCategory && !filters.edgeCategories.has(edgeCategory)) {
      return false;
    }

    return true;
  });
}

/**
 * Determine which category an edge type belongs to
 */
function getEdgeCategory(edgeType: string): EdgeCategory | null {
  for (const [category, types] of Object.entries(EDGE_CATEGORY_MAP)) {
    if (types.includes(edgeType)) {
      return category as EdgeCategory;
    }
  }
  return null;
}
