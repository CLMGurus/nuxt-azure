import paseto from "paseto";

const { V3 } = paseto;

const config = useRuntimeConfig();

async function generatePasetoToken(userId) {
  const secretKey = Buffer.from(useRuntimeConfig().paseto.secret, "base64");

  const iv = crypto.getRandomValues(new Uint8Array(16));

  return await V3.encrypt({ user_id: userId }, secretKey, {
    nonce: iv,
    expiresIn: "1h",
  });
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const userId = body.userId;

  try {
    const accessToken = await generatePasetoToken(userId);

    return { user: { user_id: userId, access_token: accessToken } };
  } catch (err) {
    console.log(err);
    return err;
  }
});
