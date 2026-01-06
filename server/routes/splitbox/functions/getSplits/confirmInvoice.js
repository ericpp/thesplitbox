import crypto from "crypto";
import { decode } from "bolt11";

export default function confirmInvoice(preimage, invoice) {
  try {
    // Validate inputs
    if (!preimage || !invoice) {
      console.error("Preimage and invoice are required for confirmation");
      return false;
    }

    // Ensure preimage is a Buffer (or handle string conversion)
    const preimageBuffer = Buffer.isBuffer(preimage)
      ? preimage
      : Buffer.from(preimage, "hex");

    // Decode the BOLT11 invoice
    const decodedInvoice = decode(invoice);

    // Extract payment_hash from tags array
    const paymentHashTag = decodedInvoice.tags.find(
      (tag) => tag.tagName === "payment_hash"
    );
    if (!paymentHashTag) {
      console.error("Payment hash is missing from decoded invoice.");
      return false;
    }

    const paymentHashFromInvoice = Buffer.from(paymentHashTag.data, "hex");

    // Hash the preimage using SHA256 to get the payment_hash
    const paymentHashFromPreimage = crypto
      .createHash("sha256")
      .update(preimageBuffer)
      .digest();

    // Compare the hashes
    if (paymentHashFromInvoice.equals(paymentHashFromPreimage)) {
      return true;
    }

    // Hashes don't match
    console.error("Payment hash verification failed: preimage doesn't match invoice");
    return false;
  } catch (error) {
    console.error("Error confirming invoice:", error.message);
    return false;
  }
}
