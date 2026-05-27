export type Message = {
  id: string;
  text: string | null;
  sender: 'user' | 'assistant' | 'system';
  timestamp: string;
};

export type ChatCompletionMessageParam = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

export type ResponseMessage<T> = {
  status: 'success' | 'error';
  data?: T;
  error?: string;
};
