export default defineEventHandler(async (event) => {
  const client = useTurso(/* event */);
  const { rows } = await client.execute("select * from users");

  return {
    data: {
      items: rows,
    },
  };
});
