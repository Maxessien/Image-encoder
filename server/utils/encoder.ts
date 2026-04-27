import sharp from "sharp";

function convertTextToBits(text: string = ""): string {
  let bits = "";

  for (let i = 0; i < text.length; i++)
    bits += text.charCodeAt(i).toString(2).padStart(8, "0");

  return bits;
}

function getLsb(
  start: number,
  end: number,
  bitArray: number[] | Buffer,
): string {
  let lsb = "";
  for (let i = start; i < end; i++) {
    const currentByteBits = bitArray?.[i]?.toString(2).padStart(8, "0");
    const modifiedBit = currentByteBits?.[currentByteBits.length - 1];
    lsb += modifiedBit;
  }

  return lsb;
}

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
  // Keep the first 512 bytes untouched; embed data after this offset.
  const imageBytes = originalBytes;
  const wordBits = convertTextToBits(message);
  const magic = convertTextToBits("MAXSTEG");

  const messageLength = wordBits.length.toString(2).padStart(32, "0");

  // Prefix payload with 32-bit length, then write one bit per pixel byte.
  const fullEncoding = magic + messageLength + wordBits;
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
  // Read from the same offset used while encoding.
  const imageBytes = originalBytes;

  const magic =
    Array.from(imageBytes?.subarray(0, 56))
      ?.map((int: number) => int?.toString(2)?.padStart(8, "0")[7])
      ?.join("")
      ?.match(/.{1,8}/g)
      ?.map((str: string) => parseInt(str, 2)) ?? [];

  if (!magic || String.fromCharCode(...magic).trim() !== "MAXSTEG") {
    throw new Error("Unrecognised encoding");
  }

  // First 32 LSBs store payload bit-length.
  const messageLength = getLsb(56, 32 + 56, imageBytes);

  const decodedMessageLength = parseInt(messageLength, 2);

  // Next bits represent the actual encoded message payload.
  const message = getLsb(32 + 56, decodedMessageLength + 32 + 56, imageBytes);

  const mesageCharCodes =
    message
      .match(/.{1,8}/g)
      ?.map((eightBitChar) => parseInt(eightBitChar, 2)) ?? [];

  const decodedMessage = String.fromCharCode(...mesageCharCodes);

  return decodedMessage;
}

export { decodeImage, encodeImage };
