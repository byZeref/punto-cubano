export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event)
  const { supabase } = await useSupabase(event)

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.error('error on login', error)
    return { error }
  }

  const { email: userEmail, role } = data.user
  const { access_token, refresh_token } = data.session
  
  return {
    data: {
      user: {
        email: userEmail,
        role,
      },
      access_token,
      refresh_token,
      ok: true,
    }
  }
})