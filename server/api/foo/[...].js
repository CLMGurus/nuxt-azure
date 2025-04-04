// server/api/foo/[...].ts
export default defineEventHandler((event) => {
  // event.context.params._ to get the route segment: 'bar/baz'
  return `Default foo handler ${event}`;
});
