import { Client, StdioClientTransport } from '@modelcontextprotocol/client';
import type { MCPServerConfig } from '../../types/MCP.js';
import { ResponseMessage } from '../../../types/Message.js';
import { Tool } from '@modelcontextprotocol/client';

export class MCPClientInstance {
  private client: Client;
  private config: MCPServerConfig;
  private transport: StdioClientTransport;
  private tools: Tool[] = [];

  constructor(config: MCPServerConfig) {
    this.config = config;
    this.client = new Client({ name: 'bizzly', version: '0.1.0' });
    this.transport = new StdioClientTransport({
      command: this.config.command,
      args: this.config.args,
      env: this.config.env,
      cwd: this.config.cwd,
    });
  }

  async connect(): Promise<ResponseMessage<undefined>> {
    try {
      await this.client.connect(this.transport);
      const response: ResponseMessage<undefined> = {
        status: 'success',
        data: undefined,
        error: undefined,
      };
      return response;
    } catch (error) {
      const response: ResponseMessage<undefined> = {
        status: 'error',
        data: undefined,
        error:
          'Failed to connect to MCP server: ' +
          (error instanceof Error ? error.message : String(error)),
      };
      return response;
    }
  }

  async disconnect(): Promise<ResponseMessage<undefined>> {
    try {
      await this.transport.close();
      await this.client.close();
      const response: ResponseMessage<undefined> = {
        status: 'success',
        data: undefined,
        error: undefined,
      };
      return response;
    } catch (error) {
      const response: ResponseMessage<undefined> = {
        status: 'error',
        data: undefined,
        error:
          'Failed to disconnect from MCP server: ' +
          (error instanceof Error ? error.message : String(error)),
      };
      return response;
    }
  }

  async getTools(): Promise<ResponseMessage<Tool[] | undefined>> {
    try {
      let toolCursor: string | undefined;
      do {
        const { tools, nextCursor } = await this.client.listTools({ cursor: toolCursor });
        this.tools.push(...tools);
        toolCursor = nextCursor;
      } while (toolCursor);
      const response: ResponseMessage<Tool[]> = {
        status: 'success',
        data: this.tools,
        error: undefined,
      };
      return response;
    } catch (error) {
      const response: ResponseMessage<undefined> = {
        status: 'error',
        data: undefined,
        error:
          'Failed to get tools from MCP server: ' +
          (error instanceof Error ? error.message : String(error)),
      };
      return response;
    }
  }
}
