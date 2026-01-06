import { decrypt } from "../../../functions/crypto/cipher.js";
import dotenv from "dotenv";

if (!process.env.ALBY_ACCESS_TOKEN_ENCRYPT) {
  dotenv.config();
}

const token = process.env.ALBY_ACCESS_TOKEN_ENCRYPT;

function fetchAccessToken(_collection) {
  return async (address) => {
    if (!address) {
      throw new Error("Address is required to fetch access token");
    }

    const collection = await _collection;
    const account = await collection.findOne({ address });

    if (!account) {
      throw new Error(`No account found for address: ${address}`);
    }

    if (!account.albyAccessToken) {
      throw new Error(`No access token found for address: ${address}`);
    }

    try {
      const decryptedToken = decrypt(token, account.albyAccessToken);

      let settings = {
        albyAccessToken: decryptedToken,
        approvedGuids:
          account.approvedGuids?.length > 0 ? account.approvedGuids : [],
      };
      return settings;
    } catch (error) {
      console.error(`Failed to decrypt access token for ${address}:`, error.message);
      throw new Error("Failed to decrypt access token");
    }
  };
}

export default fetchAccessToken;
