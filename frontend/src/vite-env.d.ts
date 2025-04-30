/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_VALID_USERNAMES: string
  readonly VITE_USER_DOB: string
  readonly VITE_VALID_EMAIL_PATTERN: string
  readonly VITE_MIN_NAME_LENGTH: string
  readonly VITE_MAX_NAME_LENGTH: string
  readonly VITE_MIN_MESSAGE_LENGTH: string
  readonly VITE_MAX_MESSAGE_LENGTH: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 