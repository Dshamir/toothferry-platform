type EventHandler = (payload: Record<string, unknown>) => void;

class EventBus {
  private listeners: Map<string, Set<EventHandler>> = new Map();
  private anyListeners: Set<(type: string, payload: Record<string, unknown>) => void> = new Set();
  private history: Array<{ type: string; payload: Record<string, unknown>; timestamp: Date }> = [];

  emit(type: string, payload: Record<string, unknown> = {}) {
    const event = { type, payload, timestamp: new Date() };
    this.history.push(event);
    if (this.history.length > 500) this.history.shift();

    this.listeners.get(type)?.forEach((handler) => handler(payload));
    this.anyListeners.forEach((handler) => handler(type, payload));
  }

  on(type: string, handler: EventHandler): () => void {
    if (!this.listeners.has(type)) this.listeners.set(type, new Set());
    this.listeners.get(type)!.add(handler);
    return () => { this.listeners.get(type)?.delete(handler); };
  }

  onAny(handler: (type: string, payload: Record<string, unknown>) => void): () => void {
    this.anyListeners.add(handler);
    return () => { this.anyListeners.delete(handler); };
  }

  getHistory(limit = 50) {
    return this.history.slice(-limit);
  }

  clear() {
    this.listeners.clear();
    this.anyListeners.clear();
    this.history = [];
  }
}

export const eventBus = new EventBus();
