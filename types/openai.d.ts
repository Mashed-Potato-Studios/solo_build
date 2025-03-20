// Type definitions for openai
declare module 'openai' {
  export interface OpenAIApi {
    createCompletion(params: CreateCompletionRequest): Promise<CreateCompletionResponse>;
    createChatCompletion(params: CreateChatCompletionRequest): Promise<CreateChatCompletionResponse>;
  }

  export interface Configuration {
    apiKey: string;
    organization?: string;
  }

  export class OpenAI {
    constructor(config: Configuration);
    chat: {
      completions: {
        create(params: CreateChatCompletionRequest): Promise<CreateChatCompletionResponse>;
      }
    };
    completions: {
      create(params: CreateCompletionRequest): Promise<CreateCompletionResponse>;
    };
  }

  export interface CreateCompletionRequest {
    model: string;
    prompt: string | string[];
    max_tokens?: number;
    temperature?: number;
    top_p?: number;
    n?: number;
    stream?: boolean;
    stop?: string | string[];
    presence_penalty?: number;
    frequency_penalty?: number;
    [key: string]: any;
  }

  export interface CreateCompletionResponse {
    id: string;
    object: string;
    created: number;
    model: string;
    choices: Array<{
      text: string;
      index: number;
      logprobs: any;
      finish_reason: string;
    }>;
    usage: {
      prompt_tokens: number;
      completion_tokens: number;
      total_tokens: number;
    };
  }

  export interface ChatCompletionMessage {
    role: 'system' | 'user' | 'assistant' | 'function';
    content: string;
    name?: string;
    function_call?: {
      name: string;
      arguments: string;
    };
  }

  export interface CreateChatCompletionRequest {
    model: string;
    messages: ChatCompletionMessage[];
    max_tokens?: number;
    temperature?: number;
    top_p?: number;
    n?: number;
    stream?: boolean;
    stop?: string | string[];
    presence_penalty?: number;
    frequency_penalty?: number;
    functions?: Array<{
      name: string;
      description?: string;
      parameters: Record<string, any>;
    }>;
    function_call?: 'auto' | 'none' | { name: string };
    [key: string]: any;
  }

  export interface CreateChatCompletionResponse {
    id: string;
    object: string;
    created: number;
    model: string;
    choices: Array<{
      index: number;
      message: ChatCompletionMessage;
      finish_reason: string;
    }>;
    usage: {
      prompt_tokens: number;
      completion_tokens: number;
      total_tokens: number;
    };
  }
}
