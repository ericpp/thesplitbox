import axios from "axios";
import jwt from "jsonwebtoken";

export default async function getAddressFromCookies(req) {
  try {
    const cookies = req.cookies;

    if (!cookies || !cookies.awt) {
      console.log("No authentication cookie found");
      return null;
    }

    let alby;
    try {
      alby = jwt.verify(cookies.awt, process.env.ALBY_JWT);
    } catch (jwtError) {
      console.log("JWT verify error: ", jwtError.message);
      return null;
    }

    if (!alby || !alby.access_token) {
      console.log("Invalid or missing access token in JWT");
      return null;
    }

    let resolve = await axios({
      url: "https://api.getalby.com/user/value4value",
      headers: { Authorization: `Bearer ${alby.access_token}` },
    }).catch((error) => {
      console.log("get addressError: ", error.response?.data || error.message);
      return null;
    });

    if (!resolve || !resolve.data) {
      console.log("Failed to fetch account data from Alby");
      return null;
    }

    let account = resolve.data;

    if (!account.lightning_address) {
      console.log("No lightning address found in account data");
      return null;
    }

    return account.lightning_address;
  } catch (error) {
    console.error("Unexpected error in getAddressFromCookies: ", error.message);
    return null;
  }
}
