export type GlobeIconPoint = {
  x: number;
  y: number;
  depth: number;
};

export type GlobeConnection = readonly [number, number];

export function buildStableGlobeConnections(
  points: GlobeIconPoint[],
  maxNeighbors = 4
): GlobeConnection[] {
  if (points.length < 2) return [];

  const connections = new Set<string>();
  const degree = new Array<number>(points.length).fill(0);
  const safeNeighborCount = Math.max(1, Math.min(maxNeighbors, points.length - 1));
  const minDegree = Math.min(3, points.length - 1);
  const hubLinkDegree = Math.min(4, points.length - 1);

  const centroid = points.reduce(
    (acc, point) => {
      acc.x += point.x;
      acc.y += point.y;
      return acc;
    },
    { x: 0, y: 0 }
  );
  const centerX = centroid.x / points.length;
  const centerY = centroid.y / points.length;
  const maxDistanceFromCenter = Math.max(
    1,
    ...points.map((point) => Math.hypot(point.x - centerX, point.y - centerY))
  );

  const addConnection = (a: number, b: number) => {
    if (a === b) return;
    const src = Math.min(a, b);
    const dst = Math.max(a, b);
    const key = `${src}-${dst}`;
    if (connections.has(key)) return;
    connections.add(key);
    degree[src] += 1;
    degree[dst] += 1;
  };

  const getWeightedDistance = (a: GlobeIconPoint, b: GlobeIconPoint) =>
    Math.hypot(a.x - b.x, a.y - b.y) + Math.abs(a.depth - b.depth) * 28;

  // Local nearest-neighbor web (dense but stable).
  for (let i = 0; i < points.length; i++) {
    const src = points[i];
    const neighbors = points
      .map((p, j) => ({
        j,
        d: getWeightedDistance(src, p)
      }))
      .filter((x) => x.j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, safeNeighborCount);

    for (const n of neighbors) {
      addConnection(i, n.j);
    }
  }

  // Ring links around centroid keep the globe globally connected.
  const angleSortedIndices = points
    .map((point, index) => ({
      index,
      angle: Math.atan2(point.y - centerY, point.x - centerX)
    }))
    .sort((a, b) => a.angle - b.angle)
    .map((entry) => entry.index);

  if (angleSortedIndices.length > 2) {
    for (let i = 0; i < angleSortedIndices.length; i++) {
      const current = angleSortedIndices[i];
      const next = angleSortedIndices[(i + 1) % angleSortedIndices.length];
      addConnection(current, next);
    }
  }

  // Create 1-to-many style links through "hub" nodes for a connected-globe feel.
  const hubCount = Math.max(1, Math.min(3, Math.floor(points.length / 8)));
  const hubs = points
    .map((point, index) => {
      const distFromCenter = Math.hypot(point.x - centerX, point.y - centerY);
      const centerScore = 1 - distFromCenter / maxDistanceFromCenter;
      const depthScore = point.depth;
      return {
        index,
        score: centerScore * 0.55 + depthScore * 0.45
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, hubCount)
    .map((item) => item.index);

  for (let i = 0; i < points.length; i++) {
    if (hubs.includes(i)) continue;

    const nearestHubs = hubs
      .map((hubIndex) => ({
        hubIndex,
        d: getWeightedDistance(points[i], points[hubIndex])
      }))
      .sort((a, b) => a.d - b.d);

    if (nearestHubs[0]) addConnection(i, nearestHubs[0].hubIndex);
    if (degree[i] < hubLinkDegree && nearestHubs[1]) {
      addConnection(i, nearestHubs[1].hubIndex);
    }
  }

  for (let i = 0; i < hubs.length; i++) {
    for (let j = i + 1; j < hubs.length; j++) {
      addConnection(hubs[i], hubs[j]);
    }
  }

  // Guarantee minimum per-node degree so no icon feels isolated.
  for (let i = 0; i < points.length; i++) {
    if (degree[i] >= minDegree) continue;

    const fallbackNeighbors = points
      .map((p, j) => ({
        j,
        d: getWeightedDistance(points[i], p)
      }))
      .filter((x) => x.j !== i)
      .sort((a, b) => a.d - b.d);

    for (const n of fallbackNeighbors) {
      addConnection(i, n.j);
      if (degree[i] >= minDegree) break;
    }
  }

  return Array.from(connections)
    .map((key) => {
      const [a, b] = key.split('-').map((v) => Number(v));
      return [a, b] as GlobeConnection;
    })
    .filter((edge) => Number.isFinite(edge[0]) && Number.isFinite(edge[1]));
}

function drawIconOriginMesh(
  ctx: CanvasRenderingContext2D,
  points: GlobeIconPoint[],
  connections: GlobeConnection[],
  cx: number,
  cy: number,
  radius: number,
  theme: string
) {
  if (points.length < 2) return;

  const lineBase = theme === 'dark' ? '148, 226, 240' : '164, 204, 190';
  const lineAlphaBase = theme === 'dark' ? 0.06 : 0.09;
  const lineAlphaDepth = theme === 'dark' ? 0.16 : 0.2;
  const lineWidthBase = theme === 'dark' ? 0.62 : 0.75;
  const edges = connections.length > 0 ? connections : buildStableGlobeConnections(points);

  for (const [srcIndex, dstIndex] of edges) {
    const src = points[srcIndex];
    const dst = points[dstIndex];
    if (!src || !dst) continue;

    const mx = (src.x + dst.x) / 2;
    const my = (src.y + dst.y) / 2;
    const dx = mx - cx;
    const dy = my - cy;
    const len = Math.hypot(dx, dy) || 1;
    const lift = radius * 0.08;
    const cx1 = mx + (dx / len) * lift;
    const cy1 = my + (dy / len) * lift;

    const alpha = lineAlphaBase + Math.min(src.depth, dst.depth) * lineAlphaDepth;
    ctx.strokeStyle = `rgba(${lineBase}, ${alpha.toFixed(3)})`;
    ctx.lineWidth = lineWidthBase + Math.min(src.depth, dst.depth) * 1.1;
    ctx.beginPath();
    ctx.moveTo(src.x, src.y);
    ctx.quadraticCurveTo(cx1, cy1, dst.x, dst.y);
    ctx.stroke();
  }
}

export function render3DGlobe(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  theme: string,
  iconPoints: GlobeIconPoint[] = [],
  connections: GlobeConnection[] = []
) {
  ctx.clearRect(0, 0, width, height);
  const cx = width / 2;
  const cy = height / 2;
  const radius = Math.min(width, height) / 2.2;

  const strokeColor = theme === 'dark' ? 'rgba(148, 226, 240, 0.1)' : 'rgba(164, 204, 190, 0.16)';

  ctx.lineWidth = 1;
  ctx.strokeStyle = strokeColor;

  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
  ctx.stroke();

  drawIconOriginMesh(ctx, iconPoints, connections, cx, cy, radius, theme);
}
