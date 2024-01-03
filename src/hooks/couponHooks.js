import api from "@/services/axios"

export async function couponConsultHook(formConsultCoupon) {
  try {
    return await api.post('/coupons/consult', formConsultCoupon)
  } catch (error) {
    return error.response
  }
}
