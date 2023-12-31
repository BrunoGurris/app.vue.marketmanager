import api from "@/services/axios"

export async function storeListHook() {
  try {
    return await api.get('/stores')
  } catch (error) {
    return error.response
  }
}

export async function storeCreateHook(formStoreCreate) {
  try {
    return await api.post('/stores', formStoreCreate)
  } catch (error) {
    return error.response
  }
}
