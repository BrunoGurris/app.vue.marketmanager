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

export async function storeEditHook(formStoreEdit, id) {
  try {
    return await api.put(`/stores/${id}`, formStoreEdit)
  } catch (error) {
    return error.response
  }
}

export async function storeDeleteHook(id) {
  try {
    return await api.delete(`/stores/${id}`)
  } catch (error) {
    return error.response
  }
}

export async function storeItemsListHook(id) {
  try {
    return await api.get(`/stores/${id}/items`)
  } catch (error) {
    return error.response
  }
}

export async function storeItemsCreateHook(id, form) {
  try {
    return await api.post(`/stores/${id}/items`, form)
  } catch (error) {
    return error.response
  }
}
