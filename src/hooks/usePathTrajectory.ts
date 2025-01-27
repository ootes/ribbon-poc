/**
 * Draws a "smooth" line through any number of points using
 * quadratic segments. This is a simplified approach sometimes
 * called "midpoint" or "curve-through-points" method.
 */
export const usePathTrajectory = (points: [number, number][]) => {
  if (points.length < 2) {
    return "";
  }

  const tension = 6; // Lower value means more "wiggly" curves

  // Start the path at the first point
  let d = `M ${points[0][0]},${points[0][1]}`;

  // For each segment, compute two control points and the end point
  // using a Catmull–Rom --> cubic Bezier conversion
  for (let i = 0; i < points.length - 1; i++) {
    // p0 is the previous point (clamped to the first if none)
    const p0 = i === 0 ? points[0] : points[i - 1];
    // p1 is the current point
    const p1 = points[i];
    // p2 is the next point
    const p2 = points[i + 1];
    // p3 is the next-next point (clamped to the last if none)
    const p3 = i + 2 < points.length ? points[i + 2] : p2;

    // Catmull–Rom to Cubic Bezier conversion:
    // Control point 1
    const c1x = p1[0] + (p2[0] - p0[0]) / tension;
    const c1y = p1[1] + (p2[1] - p0[1]) / tension;

    // Control point 2
    const c2x = p2[0] - (p3[0] - p1[0]) / tension;
    const c2y = p2[1] - (p3[1] - p1[1]) / tension;

    // Append a cubic Bézier command
    d += ` C ${c1x},${c1y} ${c2x},${c2y} ${p2[0]},${p2[1]}`;
  }

  return d;
};
