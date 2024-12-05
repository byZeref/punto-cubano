export const useFilters = () => {
  const filters = ref({
    status: 'all',
    name: '',
    email: '',
    phone: '',
  })
  const timeout = ref()

  const updateInputFilter = (type: FilterType, e: Event) => {
    const target = e.target as HTMLInputElement
    const val = target.value
    clearTimeout(timeout.value)
    timeout.value = setTimeout(() => {
      if (type === 'name') filters.value.name = val
      else if (type === 'email') filters.value.email = val
      else if (type === 'phone') filters.value.phone = val
    }, 1000)
  }

  return { filters, updateInputFilter }
}