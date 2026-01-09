import axios from "axios";
import dotenv from "dotenv";

import sendKeysend from "./sendKeysend.js";
import sendLNUrl from "./sendLNUrl.js";

if (!process.env.WEBHOOK_SERVER) {
  dotenv.config();
}

export default async function sendLNAddress({ accessToken, recipient, metadata, id }) {
  try {
    const [name, server] = recipient["@_address"].split("@");

    const keysendUrl = `https://${server}/.well-known/keysend/${name}`;
    const keysendRes = await fetch(keysendUrl);
    const keysendData = await keysendRes.json();

    if (keysendData.pubkey) {
      const keysendRecipient = {
        "@_address": keysendData.pubkey,
        "@_name": recipient["@_name"],
        "@_type": "node",
        amount: recipient.amount,
      };

      if (keysendData.customData && keysendData.customData.length > 0) {
        keysendRecipient["@_customKey"] = keysendData.customData[0].key;
        keysendRecipient["@_customValue"] = keysendData.customData[0].value;
      }

      const keysendResult = await sendKeysend({ accessToken, recipient: keysendRecipient, metadata, id });
      return keysendResult;
    }

    const lnurlpResult = await sendLNUrl({ accessToken, recipient, id });
    return lnurlpResult;
  } catch (error) {
    console.log("Payment Process Error:", error.message || error);
    return { success: false, recipient, error: error.message || error };
  }
}
