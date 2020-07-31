// Type definitions for @storybook/react/standalone v5.3.19
// This is to fix warning until stable version includes it

declare module '@storybook/react/standalone' {
  interface StorybookConfiguration {
    mode: 'dev' | 'static';
    port?: number;
    host?: string;
    configDir: string;
    staticDir?: string;
  }

  function storybook(config: StorybookConfiguration): void;

  export = storybook
}
