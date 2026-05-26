import express from "express";
import { randomUUID } from "node:crypto";
import { applyInput, createSession } from "./domain.js";
import { deleteSession, getSession, saveSession } from "./store.js";

export function createApp() {
  const app = express();
  app.use(express.json());

  app.get("/health", (_req, res) => {
    res.status(200).json({ ok: true });
  });

  app.post("/sessions", (_req, res) => {
    const session = createSession(randomUUID());
    saveSession(session);
    res.status(201).json({ id: session.id, state: session.state });
  });

  app.post("/sessions/:id/commands", (req, res) => {
    const session = getSession(req.params.id);
    if (!session) {
      res.status(404).json({ error: "SESSION_NOT_FOUND" });
      return;
    }

    const input = String(req.body?.command ?? "");
    if (!input) {
      res.status(400).json({ error: "MISSING_COMMAND" });
      return;
    }

    const updated = applyInput(session, input);
    saveSession(updated);

    // TODO: Return richer result shape for command outcomes.
    res.status(200).json({ state: updated.state, latest: updated.history.at(-1) });
  });

  app.get("/sessions/:id/state", (req, res) => {
    const session = getSession(req.params.id);
    if (!session) {
      res.status(404).json({ error: "SESSION_NOT_FOUND" });
      return;
    }

    res.status(200).json(session.state);
  });

  app.get("/sessions/:id/history", (req, res) => {
    const session = getSession(req.params.id);
    if (!session) {
      res.status(404).json({ error: "SESSION_NOT_FOUND" });
      return;
    }

    res.status(200).json(session.history);
  });

  app.delete("/sessions/:id", (req, res) => {
    const removed = deleteSession(req.params.id);
    if (!removed) {
      res.status(404).json({ error: "SESSION_NOT_FOUND" });
      return;
    }

    res.status(204).send();
  });

  return app;
}
