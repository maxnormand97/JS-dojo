import type { Board, Command, DomainError, Result, RobotState } from "./types.js";

export function createInitialState(): RobotState {
  return {
    x: 0,
    y: 0,
    facing: "NORTH",
    placed: false
  };
}

export function defaultBoard(): Board {
  return { width: 5, height: 5 };
}

export function applyCommand(
  state: RobotState,
  command: Command,
  board: Board
): Result<RobotState, DomainError> {
  // TODO: Implement full command handling with boundary protection.
  // Hint: Keep this function deterministic and easy to unit test.

  if (command.kind === "INVALID") {
    return {
      ok: false,
      error: { code: "INVALID_COMMAND", message: command.reason }
    };
  }

  return { ok: true, value: state };
}

export function report(state: RobotState): Result<string, DomainError> {
  // TODO: Return errors when not placed, and format report as "X,Y,FACING".
  if (!state.placed) {
    return {
      ok: false,
      error: { code: "NOT_PLACED", message: "Robot must be placed first" }
    };
  }

  return { ok: true, value: `${state.x},${state.y},${state.facing}` };
}
