const { AUTH_API_ERROR } = error_types

export const handleError = (e: AuthError) => {
  if (isAuthError(e)) {
    return 'Nombre de usuario o contraseña incorrectos.'
  }
}

const isAuthError = (e: AuthError) => {
  return e.status === 400 && e.name === AUTH_API_ERROR
}