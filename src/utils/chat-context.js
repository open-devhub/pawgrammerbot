import { atom } from "jotai";
import { createStore } from "jotai/vanilla";

const CONTEXT_TTL_MS = 15 * 60 * 1000;
const MAX_CONTEXT_MESSAGES = 10;

export const chatContextAtom = atom(new Map());
export const chatStore = createStore();

export function getUserContext(userId) {
  const state = chatStore.get(chatContextAtom);
  const entry = state.get(userId);
  if (!entry) return null;
  if (entry.expiresAt <= Date.now()) {
    state.delete(userId);
    chatStore.set(chatContextAtom, new Map(state));
    return null;
  }
  return entry.messages;
}

export function appendUserTurn(userId, question, answer) {
  const state = chatStore.get(chatContextAtom);
  const current = state.get(userId)?.messages || [];
  const next = [
    ...current,
    { role: "user", content: question },
    { role: "assistant", content: answer },
  ].slice(-MAX_CONTEXT_MESSAGES);

  state.set(userId, { messages: next, expiresAt: Date.now() + CONTEXT_TTL_MS });
  chatStore.set(chatContextAtom, new Map(state));
}

export function clearUserContext(userId) {
  const state = chatStore.get(chatContextAtom);
  const existed = state.delete(userId);
  if (existed) chatStore.set(chatContextAtom, new Map(state));
  return existed;
}