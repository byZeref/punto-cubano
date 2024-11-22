import { useSupabase } from "~/server/utils/supabase"

export default defineEventHandler(async (event) => {
  const { supabase } = await useSupabase(event)
  const form = await readBody(event)
  console.log(form);

  const { status, error: updateError } = await supabase
    .from('orders')
    .update({ status: form.status })
    .eq('id', form.id)

  if (updateError) {
    console.error('error on update order', updateError)
    throw createError({
      statusCode: status,
      message: updateError.message,
    })
  }

  return {
    status,
  }
})