export type ClientMessage =
  | { type: 'prompt'; data: { prompt: string } }
  | { type: 'streamcode' };

export type ServerMessage =
  | { type: 'connection'; message: string }
  | { type: 'streamcode'; data: { filename: string; content: string } }
  | { type: 'streamcode_done' }
  | { type: 'ai_chunk'; data: string }
  | { type: 'done' }
  | { type: 'error'; message: string };
