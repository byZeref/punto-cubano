import { useSupabase } from "~/server/utils/supabase"

export default defineEventHandler(async (event) => {
  const { supabase } = await useSupabase(event)
  const body = await readBody(event)
  const { product } = body

  const { status, error: removeError } = await supabase
    .from('products')
    .delete()
    .eq('id', product.id)

  if (removeError) {
    console.error('error on remove product', removeError)
    // TODO handle error (return and don't remove the image)
  }
  console.log('status remove', status)

  if (status === 204) {
    const { error: removeImageError } = await supabase.storage
      .from('products')
      .remove([product.image])
    
    if (removeImageError) {
      console.error('error on remove image', removeImageError)
      // TODO handle error
    }

  }


  return {
    status: status,
  }
})
