import api from "@/services/axios"

export async function compareCompareHook(form) {
  try {
    return await api.post('/compare', form)
  } catch (error) {
    return error.response
  }
}