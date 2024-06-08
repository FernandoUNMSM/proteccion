export const msalConfig = {
  clientID: process.env.VUE_APP_CLIENT_ID, // Reemplaza con tu clientId
  authority: `https://login.microsoftonline.com/${process.env.VUE_APP_AUTHORITY}`, // Reemplaza con tu tenantId o URL del tenant
  cacheLocation: "sessionStorage"
};
