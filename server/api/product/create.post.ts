// @ts-expect-error --> Supabase is not a module, nuxt said
import { serverSupabaseClient } from '#supabase/server'


export default defineEventHandler(async (event) => {
  const form = await readMultipartFormData(event)
  
  const payload = {
    name: form![0].data.toString(),
    description: 'Default description',
    image: new Blob([form![1].data], { type: form![1].type }),
  }
  console.log(payload)
  
  const client = await serverSupabaseClient(event)

  const fileExt = payload.image?.type.substring(6)
  const fileName = `${payload.name.toLowerCase().replaceAll(' ', '-')}.${fileExt}`

  const product = {
    name: payload.name,
    description: payload.description,
    image: fileName,
  }

  const { status, error: insertError } = await client
    .from('products')
    .insert(product)

  console.log('status create', status)

  
  const { data, error: uploadError } = await client.storage
    .from('products')
    .upload(fileName, payload.image)

  console.log('upload', data)
  
  const success = !insertError && !uploadError

  return {
    data: {
      product: {
        name: payload.name,
        description: payload.description,
        image: fileName,
      }
    },
    ok: success
  };
});
