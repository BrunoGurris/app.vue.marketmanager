import api from "@/services/axios"

export async function authLoginHook(formAuthLogin) {
  try {
    return await api.post('auth/login', formAuthLogin)
  } catch (error) {
    return error.response
  }
}