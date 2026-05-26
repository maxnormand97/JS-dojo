// Intentionally flawed code for review/debug practice.

type Facing = "NORTH" | "EAST" | "SOUTH" | "WEST";

interface State {
  x: number;
  y: number;
  facing: Facing;
}

const size = 5;

export function move(state: State): State {
  if (state.facing === "NORTH") state.y++;
  if (state.facing === "EAST") state.x++;
  if (state.facing === "SOUTH") state.y--;
  if (state.facing === "WEST") state.x--;
  return state;
}

export function place(x: number, y: number, facing: string): State {
  return { x, y, facing: facing as Facing };
}

export function report(state: State): string {
  return `${state.x},${state.y},${state.facing},${size}`;
}
