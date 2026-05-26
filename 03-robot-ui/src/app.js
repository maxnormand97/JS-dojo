const els = {
  apiBase: document.getElementById("apiBase"),
  createSessionBtn: document.getElementById("createSessionBtn"),
  sessionInfo: document.getElementById("sessionInfo"),
  commandInput: document.getElementById("commandInput"),
  sendCommandBtn: document.getElementById("sendCommandBtn"),
  stateView: document.getElementById("stateView"),
  historyList: document.getElementById("historyList"),
  errorBox: document.getElementById("errorBox")
};

let sessionId = null;

function setError(message) {
  if (!message) {
    els.errorBox.hidden = true;
    els.errorBox.textContent = "";
    return;
  }
  els.errorBox.hidden = false;
  els.errorBox.textContent = message;
}

async function createSession() {
  setError("");
  const base = els.apiBase.value.trim();

  // TODO: Add loading states and stronger error mapping.
  const res = await fetch(`${base}/sessions`, { method: "POST" });
  if (!res.ok) throw new Error("Could not create session");

  const data = await res.json();
  sessionId = data.id;
  els.sessionInfo.textContent = `Session: ${sessionId}`;
  els.stateView.textContent = JSON.stringify(data.state, null, 2);
  els.sendCommandBtn.disabled = false;
  els.historyList.innerHTML = "";
}

async function sendCommand() {
  if (!sessionId) return;

  setError("");
  const base = els.apiBase.value.trim();
  const command = els.commandInput.value.trim();

  if (!command) {
    setError("Command is required");
    return;
  }

  const res = await fetch(`${base}/sessions/${sessionId}/commands`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ command })
  });

  if (!res.ok) {
    setError(`Command failed: ${res.status}`);
    return;
  }

  const data = await res.json();
  els.stateView.textContent = JSON.stringify(data.state, null, 2);

  const item = document.createElement("li");
  item.textContent = `${command} -> ${JSON.stringify(data.latest)}`;
  els.historyList.prepend(item);

  els.commandInput.value = "";
}

els.createSessionBtn.addEventListener("click", () => {
  createSession().catch((err) => setError(err.message));
});

els.sendCommandBtn.addEventListener("click", () => {
  sendCommand().catch((err) => setError(err.message));
});
