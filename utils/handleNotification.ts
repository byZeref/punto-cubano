type ToastType = 'error' | 'success'

export const notify = (message: string, type: ToastType) => {
  const toast = useToast()
  const title = type === 'error' ? 'Error!' : 'Bien!'
  const color = type === 'error' ? 'red' : 'emerald'
  const icon = type === 'error' ? 'i-heroicons-exclamation-triangle' : 'i-heroicons-check-badge'
  const timeout = type === 'error' ? 5000 : 2000

  toast.add({
    description: message,
    title,
    timeout,
    icon,
    color,
  })
}