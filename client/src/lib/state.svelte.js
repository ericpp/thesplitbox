import { dev } from "$app/environment";

// Use import.meta.env for optional environment variables (returns undefined if not set)
const PUBLIC_ALBY_ID = import.meta.env.PUBLIC_ALBY_ID;
const PUBLIC_CLIENT_URL = import.meta.env.PUBLIC_CLIENT_URL;
const PUBLIC_SERVER_URL = import.meta.env.PUBLIC_SERVER_URL;

export const remoteServer = PUBLIC_SERVER_URL || (dev
  ? "http://localhost:3000"
  : "https://thesplitbox.com");
export const albyClientId = PUBLIC_ALBY_ID || (dev
  ? "aOvklwRiaF"
  : "3IsGwlTSvi");
export const albyRedirectUrl = PUBLIC_CLIENT_URL || (dev
  ? "http://localhost:5173"
  : "https://thesplitbox.com");

export const user = $state({
  address: "",
});
