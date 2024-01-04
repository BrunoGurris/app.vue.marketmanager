import api from "@/services/axios"

export async function couponConsultHook(formConsultCoupon) {
  try {
    return await api.post('/coupons/consult', formConsultCoupon)
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
