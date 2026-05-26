import type { Command, Facing } from "./types.js";

const FACINGS: Facing[] = ["NORTH", "EAST", "SOUTH", "WEST"];

export function parseCommand(input: string): Command {
  // TODO: Parse PLACE X,Y,F and basic commands.
  // Return { kind: "INVALID", ... } for malformed input.
  const text = input.trim().toUpperCase();

  if (text === "MOVE") return { kind: "MOVE" };
  if (text === "LEFT") return { kind: "LEFT" };
  if (text === "RIGHT") return { kind: "RIGHT" };
  if (text === "REPORT") return { kind: "REPORT" };

  if (text.startsWith("PLACE ")) {
    const payload = text.slice(6);
    const [xRaw, yRaw, facingRaw] = payload.split(",");

    // TODO: Replace this placeholder parser with robust validation.
    const x = Number(xRaw);
    const y = Number(yRaw);
    const facing = facingRaw as Facing;

    if (Number.isInteger(x) && Number.isInteger(y) && FACINGS.includes(facing)) {
      return { kind: "PLACE", x, y, facing };
    }

    return { kind: "INVALID", raw: input, reason: "Malformed PLACE command" };
  }

  return { kind: "INVALID", raw: input, reason: "Unknown command" };
}
