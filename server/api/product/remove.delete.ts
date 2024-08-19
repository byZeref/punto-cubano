import { useSupabase } from "~/server/utils/supabase"

export default defineEventHandler(async (event) => {
  const { supabase } = await useSupabase(event)
  const body = await readBody(event)
  const { product } = body

  // eslint-disable-next-line
  let { status, error: removeError } = await supabase
    .from('products')
    .delete()
    .eq('id', product.id)

  if (removeError) {
    console.error('error on remove product', removeError)
    throw createError({
      statusCode: status,
      message: removeError.message,
    })
  }
  console.log('status remove', status)

  let message
  if (status === 204) {
    const { error: removeImageError } = await supabase.storage
      .from('products')
      .remove([product.image])
    
    if (removeImageError) {
      console.error('error on remove image', removeImageError)
      status = removeImageError.statusCode
      message = 'No se pudo eliminar la imagen. Por favor, inténtelo de nuevo.'
    }
  }

  return {
    status,
    message,
  }
})
