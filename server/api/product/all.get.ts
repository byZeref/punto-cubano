// @ts-expect-error --> Supabase is not a module, nuxt said
import { serverSupabaseClient } from '#supabase/server'
import type { Product } from "~/utils/types";


export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)

  const { data: products } = await client.from('products').select()
  console.log(products);

  products.forEach((prod: Product) => {
    if (!prod.image) return
    const { data } = client.storage.from('products').getPublicUrl(prod.image)
    prod.imageUrl = data.publicUrl
  })
  

  return {
    data: {
      products,
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
