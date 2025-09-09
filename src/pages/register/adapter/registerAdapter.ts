import type { registerData } from '../service/registerService'

export const registerAdapter = (data: registerData) => ({
    username: data.username,
    email: data.email,
    password: data.password,
    role: data.role
})