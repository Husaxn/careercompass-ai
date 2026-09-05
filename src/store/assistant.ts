import { createStore } from './create-store';

export type ChatRole = 'user' | 'assistant';

export interface AssistantMessage {
  id: string;
  role: ChatRole;
  text: string;
  /** True while a CV is being analyzed (shows an inline spinner). */
  analyzing?: boolean;
  /** True when the message is an error the user can retry. */
  error?: boolean;
  /** Displayed attachment label (e.g. an uploaded CV filename). */
  attachment?: string;
  createdAt: number;
}

export interface AssistantState {
  messages: AssistantMessage[];
  open: boolean;
}

const initialState: AssistantState = {
  messages: [],
  open: false,
};

const store = createStore<AssistantState>(initialState);

let counter = 0;

function makeId() {
  counter += 1;
  return `m${Date.now()}-${counter}`;
}

export const assistantStore = {
  ...store,
  openPanel() {
    store.setState({ open: true });
  },
  closePanel() {
    store.setState({ open: false });
  },
  togglePanel() {
    store.setState({ open: !store.getSnapshot().open });
  },
  addMessage(message: Omit<AssistantMessage, 'id' | 'createdAt'>) {
    const msg: AssistantMessage = { ...message, id: makeId(), createdAt: Date.now() };
    store.setState({ messages: [...store.getSnapshot().messages, msg] });
    return msg.id;
  },
  updateMessage(id: string, patch: Partial<AssistantMessage>) {
    const messages = store.getSnapshot().messages.map((message) =>
      message.id === id ? { ...message, ...patch } : message,
    );
    store.setState({ messages });
  },
  removeMessage(id: string) {
    store.setState({ messages: store.getSnapshot().messages.filter((m) => m.id !== id) });
  },
  reset() {
    store.setState({ messages: [] });
  },
};

export function useAssistant(): AssistantState {
  return store.useStore();
}
