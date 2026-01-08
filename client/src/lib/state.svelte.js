import { dev } from "$app/environment";

export const albyClientId = import.meta.env.VITE_ALBY_ID;
export const albyRedirectUrl = import.meta.env.VITE_REDIRECT_URL;
export const remoteServer = import.meta.env.VITE_SERVER_URL;

export const user = $state({
  address: "",
});