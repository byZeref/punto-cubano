export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event)
  const { supabase } = await useSupabase(event)

  const { error } = await supabase.auth.signOut()

  if (error) {
    console.error('error on logout', error)
    return { error }
  }
  
  return {
    data: {
      
    }
  }
})