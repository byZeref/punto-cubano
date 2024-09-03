export const formatDate = (date: Date) => {
  // @ts-expect-error --> Some string error on year
  return new Date(date).toLocaleString('es-ES', DATE_TIME_BASE_FORMAT)
}