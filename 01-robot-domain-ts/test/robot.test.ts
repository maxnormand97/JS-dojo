import { describe, expect, it } from "vitest";
import { applyCommand, createInitialState, defaultBoard, report } from "../src/robot.js";
import { parseCommand } from "../src/parser.js";

describe("toy robot domain", () => {
  it("starts unplaced", () => {
    const state = createInitialState();
    const out = report(state);
    expect(out.ok).toBe(false);
  });

  it("parses MOVE command", () => {
    expect(parseCommand("MOVE")).toEqual({ kind: "MOVE" });
  });

  it("placeholder applyCommand currently no-ops", () => {
    const state = createInitialState();
    const command = parseCommand("LEFT");
    const out = applyCommand(state, command, defaultBoard());
    expect(out.ok).toBe(true);
  });

  // TODO: Add full edge-case coverage:
  // - PLACE out of bounds
  // - MOVE blocked at edges
  // - LEFT/RIGHT wrapping
  // - invalid commands ignored or rejected per your chosen behavior
});
