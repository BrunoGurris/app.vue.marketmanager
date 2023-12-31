import api from "@/services/axios"

export async function storeListHook() {
  try {
    return await api.get('/stores')
  } catch (error) {
    return error.response
  }
}