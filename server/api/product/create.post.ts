import { useSupabase } from "~/server/utils/supabase";
import type { Product } from "~/utils/types";

type Payload = {
  name: string,
  description: string,
  image?: BlobPart
}

export default defineEventHandler(async (event) => {
  const { supabase } = await useSupabase(event)
  const form = await readMultipartFormData(event)
  const hasImage = form![1] !== undefined
  let fileName
  
  const payload: Payload = {
    name: form![0].data.toString(),
    description: 'Default description',
  }
  const product: Product = {
    name: payload.name,
    description: payload.description,
  }
  if (hasImage) {
    payload.image = new Blob([form![1].data], { type: form![1].type })
    const fileExt = payload.image?.type.substring(6)
    fileName = `${payload.name.toLowerCase().replaceAll(' ', '-')}.${fileExt}`
    product.image = fileName
  }
    
  console.log(payload)

  const { status, error: insertError } = await supabase
    .from('products')
    .insert(product)

  if (insertError) {
    console.error('error on create product', insertError)
    // TODO handle error
  }
  console.log('status create', status)

  if (status === 201 && hasImage) {
    const { data, error: uploadError } = await supabase.storage
      .from('products')
      .upload(fileName, payload.image)

    if (uploadError) {
      console.error('error on upload image', uploadError)
      // TODO handle error
    }

    console.log('upload', data)
  }


  return {
    data: {
      product,
    },
  };
});
