import api from "@/services/axios"

export async function consultPriceAndAmountHook(formConsultPriceAndAmount) {
  try {
    return await api.post('/consult', formConsultPriceAndAmount)
  } catch (error) {
    return error.response
  }
}