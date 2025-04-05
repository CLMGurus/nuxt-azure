import paseto from "paseto";

const { V3 } = paseto;

export default defineEventHandler(async (event) => {
  const protectedRoutes = ["/api/protect"]; // Add more protected routes as needed

  // Only apply auth check if route matches protected paths
  if (protectedRoutes.some((route) => event.path.startsWith(route))) {
    const tokenHeader = getHeader(event, "x-auth-token");

    if (!tokenHeader) {
      throw createError({
        statusCode: 401,
        message: "Unauthorized: No token provided",
      });
    }

    const token = tokenHeader.trim().startsWith("Bearer ")
      ? tokenHeader.split(" ")[1]
      : tokenHeader;

    const secretKey = Buffer.from(useRuntimeConfig().paseto.secret, "base64");

    try {
      const payload = await V3.decrypt(token, secretKey);
      event.context.auth = { user: payload };
    } catch (error) {
      console.error("Error verifying PASETO token:", error);
      throw createError({
        statusCode: 401,
        message: `token:${token} pastoSecret:${useRuntimeConfig().paseto.secret} secretkey:${secretKey} error:${error}`,
      });
    }
  }
});
