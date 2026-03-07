import sharp from "sharp";

/**
 *
 * @param {String} imagePath - Path to image you want to encode
 * @param {String} message - Message to encode in image
 * @returns Encoded Image bytes
 */
async function encodeImage(imagePath: string, message: string) {
  const {
    data: originalBytes,
    info: { width, height, channels },
  } = await sharp(imagePath).raw().toBuffer({ resolveWithObject: true });
  const imageBytes = Buffer.from(originalBytes.subarray(512));
  let wordBits = "";

  for (let i = 0; i < message.length; i++)
    wordBits += message.charCodeAt(i).toString(2).padStart(8, "0");

  const messageLength = wordBits.length.toString(2).padStart(32, "0");

  const fullEncoding = messageLength + wordBits;
  for (let i = 0; i < fullEncoding.length; i++) {
    let currentByteBits = imageBytes?.[i]?.toString(2).padStart(8, "0");
    const modifiedBits =
      currentByteBits?.slice(0, currentByteBits.length - 1) +
      (fullEncoding?.[i] ?? "");
    imageBytes[i] = parseInt(modifiedBits, 2);
  }

  const fileBuffer = sharp(
    Buffer.concat([Buffer.from(originalBytes.subarray(0, 512)), imageBytes]),
    { raw: { width, height, channels } },
  )
    .png()
    .toBuffer();
  return fileBuffer;
}

/**
 *
 * @param {String} imagePath - Path to image you want to decode
 * @returns {String} Decoded Message
 */
async function decodeImage(imagePath: string) {
  const { data: originalBytes } = await sharp(imagePath)
    .raw()
    .toBuffer({ resolveWithObject: true });
  const imageBytes = Buffer.from(originalBytes.subarray(512));

  let messageLength = "";

  for (let i = 0; i < 32; i++) {
    let currentByteBits = imageBytes?.[i]?.toString(2).padStart(8, "0");
    const modifiedBit = currentByteBits?.[currentByteBits.length - 1];
    messageLength += modifiedBit;
  }

  const decodedMessageLength = parseInt(messageLength, 2);

  let message = "";

  for (let i = 32; i < decodedMessageLength + 32; i++) {
    let currentByteBits = imageBytes?.[i]?.toString(2).padStart(8, "0");
    const modifiedBit = currentByteBits?.[currentByteBits.length - 1];
    message += modifiedBit;
  }

  let decodedMessage = "";

  for (let charNum of message.match(/.{1,8}/g) ?? [])
    decodedMessage += String.fromCharCode(parseInt(charNum, 2));

  return decodedMessage;
}

export { decodeImage, encodeImage };
