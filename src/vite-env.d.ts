/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_HOST_BASE?: string;
  readonly VITE_COMING_SOON_GATE?: string;
  readonly VITE_COMING_SOON_BYPASS?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

