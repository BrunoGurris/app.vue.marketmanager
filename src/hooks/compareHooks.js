import api from "@/services/axios"

export async function compareStoresHook(form) {
  try {
    return await api.post('/compare/stores', form)
  } catch (error) {
    return error.response
  }
}