export type Facing = "NORTH" | "EAST" | "SOUTH" | "WEST";

export interface RobotState {
  x: number;
  y: number;
  facing: Facing;
  placed: boolean;
}

export interface Session {
  id: string;
  state: RobotState;
  history: Array<{ input: string; ok: boolean; message: string }>;
}

export function createSession(id: string): Session {
  return {
    id,
    state: { x: 0, y: 0, facing: "NORTH", placed: false },
    history: []
  };
}

export function applyInput(session: Session, input: string): Session {
  // TODO: Integrate your domain parser/engine here.
  // Keep this pure if possible, or clearly isolate mutation boundaries.
  return {
    ...session,
    history: [...session.history, { input, ok: false, message: "Not implemented" }]
  };
}
