/**
 * @typedef {Object} ApiConfig
 * @property {string} baseUrl
 * @property {number} timeout
 *
 * @typedef {Object} AppConfig
 * @property {'development' | 'production'} mode
 *
 * @typedef {Object} Config
 * @property {ApiConfig} api
 * @property {AppConfig} app
 */

/**
 * @returns {Config}
 */
export function getConfig() {
  const env = import.meta.env || {};

  return {
    api: {
      baseUrl: env.VITE_API_BASE_URL || "http://localhost:3000",
      timeout: Number(env.VITE_API_TIMEOUT) || 5000,
    },

    app: {
      mode: env.MODE === "production" ? "production" : "development",
    },
  };
}
