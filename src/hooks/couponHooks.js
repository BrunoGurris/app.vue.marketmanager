import api from "@/services/axios"

export async function couponListHook() {
  try {
    return await api.get('/coupons')
  } catch (error) {
    return error.response
  }
}

export async function couponCreateHook(formCreateCoupon) {
  try {
    return await api.post('/coupons', formCreateCoupon)
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
