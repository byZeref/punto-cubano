// @ts-expect-error --> Supabase is not a module, nuxt said
import { serverSupabaseClient } from '#supabase/server'


export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)

  const { data } = await client.from('products').select()
  console.log(data);
  

  return {
    data: {
      products: data,
    },
  };
});


// export default defineEventHandler(async (event) => {
//   const client = useTurso(/* event */);
//   const { rows } = await client.execute("select * from users");

//   return {
//     data: {
//       items: rows,
//     },
//   };
// });
