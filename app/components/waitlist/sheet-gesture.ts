/** Share of the sheet's height a drag must pass to close it. */
const DISMISS_DISTANCE_RATIO = 0.25;

/** Downward speed (px per ms) that closes the sheet whatever the distance. */
const DISMISS_VELOCITY = 0.11;

/** A flick has to travel at least this far (px), so a jittery tap isn't one. */
const MIN_FLICK_DISTANCE = 10;

export type DragResult = {
  /** How far the sheet was dragged down, in px (negative is up). */
  distance: number;
  /** How long the drag took, in ms. */
  elapsedMs: number;
  /** The sheet's height, in px. */
  sheetHeight: number;
};

/** Whether a finished drag closes the sheet, or it springs back. */
export function shouldDismiss({
  distance,
  elapsedMs,
  sheetHeight,
}: DragResult): boolean {
  if (distance >= sheetHeight * DISMISS_DISTANCE_RATIO) return true;
  if (distance < MIN_FLICK_DISTANCE) return false;
  return distance / Math.max(elapsedMs, 1) > DISMISS_VELOCITY;
}

/** Furthest the sheet can be pulled up past its resting place, in px. */
const MAX_OVERDRAG = 36;

/**
 * Where the sheet sits for a finger `delta` px from where the drag started
 * (positive is down). Down follows the finger; up past the top meets growing
 * resistance and eases toward MAX_OVERDRAG instead of hitting a wall.
 */
export function dragOffset(delta: number): number {
  if (delta >= 0) return delta;
  const pulled = -delta;
  return -((MAX_OVERDRAG * pulled) / (pulled + MAX_OVERDRAG));
}
