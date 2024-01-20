import api from "@/services/axios"

export async function couponListHook() {
  try {
    return await api.get('/coupons')
  } catch (error) {
    return error.response
  }
}

export async function couponViewHook(id) {
  try {
    return await api.get(`/coupons/${id}`)
  } catch (error) {
    return error.response
  }
}

export async function couponCreateHook(form) {
  try {
    return await api.post('/coupons', form)
  } catch (error) {
    return error.response
  }
}

export async function couponEditHook(form, id) {
  try {
    return await api.put(`/coupons/${id}`, form)
  } catch (error) {
    return error.response
  }
}

export async function couponDeleteHook(id) {
  try {
    return await api.delete(`/coupons/${id}`)
  } catch (error) {
    return error.response
  }
}

export async function couponItemsHook(id) {
  try {
    return await api.get(`/coupons/${id}/items`)
  } catch (error) {
    return error.response
  }
}
