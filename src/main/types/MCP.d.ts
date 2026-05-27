export type MCPServerConfig = {
  name: string;
  command: string;
  args: string[];
  env?: Record<string, string>;
  cwd?: string;
};
