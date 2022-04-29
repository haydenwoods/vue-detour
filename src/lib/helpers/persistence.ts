import {
  DetourPersistence,
  DetourPersistenceOption,
  DetourPersistenceOptions,
  DetourStatus,
} from "../types/detour";

import { DEFAULT_PERSISTENCE_OPTIONS } from "../constants/persistence";

export const isPersistenceOptions = (
  options: DetourPersistenceOption
): options is DetourPersistenceOptions => {
  return typeof options === "object";
};

export const isPersistenceBoolean = (
  options: DetourPersistenceOption
): options is boolean => {
  return typeof options === "boolean";
};

export const getPersistenceOptions = ({
  options,
}: {
  options: DetourPersistenceOption;
}) => {
  return isPersistenceBoolean(options) ? DEFAULT_PERSISTENCE_OPTIONS : options;
};

export const getPersistenceKey = ({
  options,
}: {
  options: DetourPersistenceOptions;
}) => {
  return `vue-detour-${options.key}-${options.version}`;
};

export const getPersistenceStorage = ({
  options,
}: {
  options: DetourPersistenceOptions;
}) => {
  const storages: Record<DetourPersistenceOptions["type"], Storage> = {
    local: localStorage,
    session: sessionStorage,
  };

  const storage = storages[options.type];

  return storage;
};

export const persistenceWrite = ({
  status,
  stepIndex,
  options,
}: {
  status: DetourStatus;
  stepIndex: number;
  options: DetourPersistenceOption;
}) => {
  options = getPersistenceOptions({ options });

  const storage = getPersistenceStorage({ options });
  const key = getPersistenceKey({ options });

  const persistence: DetourPersistence = {
    status,
    stepIndex,
  };
  const value = JSON.stringify(persistence);

  storage.setItem(key, value);
};

export const persistenceRead = ({
  options,
}: {
  options: DetourPersistenceOption;
}) => {
  options = getPersistenceOptions({ options });

  const storage = getPersistenceStorage({ options });
  const key = getPersistenceKey({ options });

  const value = storage.getItem(key);

  if (value) {
    return JSON.parse(value) as DetourPersistence;
  }
};
