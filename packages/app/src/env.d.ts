declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    VUE_ROUTER_MODE: 'hash' | 'history' | 'abstract' | undefined;
    VUE_ROUTER_BASE: string | undefined;
  }
}

interface ImportMetaEnv {
    readonly VITE_SUPABASE_ENDPOINT: string;
    readonly VITE_SUPABASE_KEY: string;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }

  interface ImportMetaEnv {
    readonly VITE_SUPABASE_ENDPOINT: string;
    readonly VITE_SUPABASE_KEY: string;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
