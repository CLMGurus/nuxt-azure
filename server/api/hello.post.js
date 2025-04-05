export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  return {
    event: event,
    message: `Hello ${body.name}`,
  };
});
