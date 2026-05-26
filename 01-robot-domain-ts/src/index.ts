import { createInitialState, defaultBoard } from "./robot.js";

// TODO: Add a tiny CLI harness if you want local manual testing.
const state = createInitialState();
const board = defaultBoard();

console.log("Domain starter loaded", { state, board });
