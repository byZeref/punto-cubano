import { useSupabase } from "~/server/utils/supabase"
import type { Product, ProductPayload } from "~/utils/types"
import { validateProductPayload } from "~/server/utils/validations"

export default defineEventHandler(async (event) => {
  const { supabase } = await useSupabase(event)
  const form = await readMultipartFormData(event)
  const hasImage = form!.some(item => item.name === 'image')
  let fileName
  const payload: ProductPayload = {
    name: form!.find(item => item.name === 'name')!.data.toString(),
    description: form!.find(item => item.name === 'description')!.data.toString(),
    price: form!.find(item => item.name === 'price')!.data.toString(),
    category: form!.find(item => item.name === 'category')!.data.toString(),
    available: form!.find(item => item.name === 'available')!.data.toString() === 'true',
  }
  
  validateProductPayload(payload)

  const product: Product = {
    name: payload.name,
    description: payload.description,
    price: payload.price,
    category: payload.category,
    available: payload.available,
  }

  if (hasImage) {
    const file = form!.find(item => item.name === 'image')
    payload.image = new Blob([file!.data], { type: file!.type })
    const fileExt = payload.image?.type.substring(6)
    fileName = `${payload.name.toLowerCase().replaceAll(' ', '-')}.${fileExt}`
    fileName = fileName.replaceAll('ñ', 'n')
    product.image = fileName
  }

  // eslint-disable-next-line
  let { status, error: insertError } = await supabase
    .from('products')
    .insert(product)

  if (insertError) {
    console.error('error on create product', insertError)
    throw createError({
      statusCode: status,
      message: insertError.message,
    })
  }

  let message
  if (status === 201 && hasImage) {
    const { data, error: uploadError } = await supabase.storage
      .from('products')
      .upload(fileName, payload.image)

    if (uploadError) {
      console.error('error on upload image', uploadError)
      status = uploadError.statusCode
      message = 'No se pudo subir la imagen. Por favor, inténtelo de nuevo.'
    }
  }


  return {
    product,
    status,
    message,
  }
})
