import api from "@/services/axios"

export async function compareCouponHook(form) {
  try {
    return await api.post('/compare/coupon', form)
  } catch (error) {
    return error.response
  }
}

export async function compareStoresHook(form) {
  try {
    return await api.post('/compare/stores', form)
  } catch (error) {
    return error.response
  }
}