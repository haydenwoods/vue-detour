import { DetourPersistenceOptions } from "../types/detour";

export const DEFAULT_PERSISTENCE_OPTIONS: DetourPersistenceOptions = {
  type: "local",
  key: window.location.pathname,
  version: 1,
};
