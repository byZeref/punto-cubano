import { useSupabase } from "~/server/utils/supabase"
import type { Product, ProductPayload } from "~/utils/types"

export default defineEventHandler(async (event) => {
  const { supabase } = await useSupabase(event)
  const form = await readMultipartFormData(event)
  const hasImage = form!.some(item => item.name === 'image')
  console.log('image', hasImage)
  // return
  
  let fileName
  
  const payload: ProductPayload = {
    id: form!.find(item => item.name === 'id')!.data.toString(),
    name: form!.find(item => item.name === 'name')!.data.toString(),
    description: form!.find(item => item.name === 'description')!.data.toString(),
    price: parseFloat(form!.find(item => item.name === 'price')!.data.toString()),
    category: form!.find(item => item.name === 'category')!.data.toString(),
    available: form!.find(item => item.name === 'available')!.data.toString() === 'true',
  }
  
  const product: Product = {
    name: payload.name,
    description: payload.description,
    price: payload.price,
    category: payload.category,
    available: payload.available,
  }

  if (hasImage) {
    payload['oldImageName'] = form!.find(item => item.name === 'oldImageName')?.data.toString()
    const file = form!.find(item => item.name === 'image')
    payload.image = new Blob([file!.data], { type: file!.type })
    const fileExt = payload.image?.type.substring(6)
    fileName = `${payload.name.toLowerCase().replaceAll(' ', '-')}.${fileExt}`
    product.image = fileName
  }
  console.info('payload', payload)
  console.info('product', product)
  // return

  // eslint-disable-next-line
  let { status, error: updateError } = await supabase
    .from('products')
    .update(product)
    .eq('id', payload.id)

  if (updateError) {
    console.error('error on update product', updateError)
    throw createError({
      statusCode: status,
      message: updateError.message,
    })
  }
  console.log('status update', status)

  let message
  if (status === 204 && hasImage) {
    const { error: removeImageError } = await supabase.storage
      .from('products')
      .remove([payload.oldImageName])
    
    if (removeImageError) {
      console.error('error on remove image', removeImageError)
      status = removeImageError.statusCode
      message = 'No se pudo eliminar la imagen anterior. Por favor, inténtelo de nuevo.'
      return { status, message }
    }

    const { data, error: uploadImageError } = await supabase.storage
      .from('products')
      .upload(fileName, payload.image)

    if (uploadImageError) {
      console.error('error on upload image', uploadImageError)
      status = uploadImageError.statusCode
      message = 'No se pudo subir la imagen. Por favor, inténtelo de nuevo.'
    }

  }


  return {
    product,
    status,
    message,
  }
})
