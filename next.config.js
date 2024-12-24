/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";
import { env } from "./src/env.js";

const authUrl = env.AUTH_URL;
/** @type {import("next").NextConfig} */
const config = {
  // Enable for ngrok testing
  // env: {
  //   authUrl: authUrl,
  //   TRUSTED_HOSTS: env.AUTH_TRUST_HOST,
  // },
};

export default config;
