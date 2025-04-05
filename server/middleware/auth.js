import paseto from "paseto";

const { V3 } = paseto;

export default defineEventHandler(async (event) => {
  const protectedRoutes = ["/api/protect"];

  const authHeader = getHeader(event, "Authorization");
  let payload;

  if (protectedRoutes.some((route) => event.path.startsWith(route))) {
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw createError({
        statusCode: 401,
        message: "Unauthorized: No token provided",
      });
    }

    const token = authHeader.split(" ")[1];
    const secretKey = Buffer.from(useRuntimeConfig().paseto.secret, "base64");

    try {
      payload = await V3.decrypt(token, secretKey);
      event.context.auth = { user: payload };
    } catch (error) {
      console.error("Error verifying PASETO token:", error);
      throw createError({
        statusCode: 401,
        message: `Unauthorized: Invalid token ${payload} ${error}`,
      });
    }
  }
});
