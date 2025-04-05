export default defineEventHandler((event) => {
  return {
    event: event,
    message: `this is protected`,
  };
});
