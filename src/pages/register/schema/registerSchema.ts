import { z } from "zod";

export const registerSchema = z.object({
    username: z.string()
    .min(3, "El nombre de usuario debe tener almenos 3 carácteres")
    .max(10, "El nombre de usuario debe tener como máximo 10 carácteres"),
    email: z.email("Debe ser un correo válido"),
    password: z.string()
    .min(3, "La contraseña debe tener almenos 3 carácteres")
    .max(250, "La contraseña debe tener almenos 3 carácteres")
})