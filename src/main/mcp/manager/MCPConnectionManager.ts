import { MCPServerConfig } from '../../../types/MCP.js';
import { MCPClientInstance } from '../client/MCPClientInstance.js';

const serverConfig: MCPServerConfig = {
  name: 'fast-filesystem',
  command: 'npx',
  args: ['-y', 'fast-filesystem-mcp'],
};

export class MCPConnectionManager {
  private mcpClient: MCPClientInstance | null = null;

  constructor() {}

  async startMCPServer() {
    this.mcpClient = new MCPClientInstance(serverConfig);
    const connectResponse = await this.mcpClient.connect();
    if (connectResponse.status === 'error') {
      console.error('Error connecting to MCP server:', connectResponse.error);
      return;
    }
    console.log('Connected to MCP server successfully.');
  }

  async stopMCPServer() {
    if (!this.mcpClient) {
      console.warn('MCP client is not initialized.');
      return;
    }
    const disconnectResponse = await this.mcpClient.disconnect();
    if (disconnectResponse.status === 'error') {
      console.error('Error disconnecting from MCP server:', disconnectResponse.error);
      return;
    }
    this.mcpClient = null;
    console.log('Disconnected from MCP server successfully.');
  }

  async getAvailableTools() {
    if (!this.mcpClient) {
      console.warn('MCP client is not initialized.');
      return;
    }
    const toolsResponse = await this.mcpClient.getTools();
    if (toolsResponse.status === 'error') {
      console.error('Error fetching tools from MCP server:', toolsResponse.error);
      return;
    }
    console.log(
      'Available tools:',
      toolsResponse.data?.map((t) => t.name),
    );
  }
}
