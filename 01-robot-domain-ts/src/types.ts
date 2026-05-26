export type Facing = "NORTH" | "EAST" | "SOUTH" | "WEST";

export interface Board {
  width: number;
  height: number;
}

export interface RobotState {
  x: number;
  y: number;
  facing: Facing;
  placed: boolean;
}

export type Command =
  | { kind: "PLACE"; x: number; y: number; facing: Facing }
  | { kind: "MOVE" }
  | { kind: "LEFT" }
  | { kind: "RIGHT" }
  | { kind: "REPORT" }
  | { kind: "INVALID"; raw: string; reason: string };

export type DomainError =
  | { code: "NOT_PLACED"; message: string }
  | { code: "OUT_OF_BOUNDS"; message: string }
  | { code: "INVALID_COMMAND"; message: string };

export type Result<T, E> =
  | { ok: true; value: T }
  | { ok: false; error: E };
