import React, { useState } from 'react'
import Input from '../../components/Input';
import type { registerData } from './service/registerService';
import { registerSchema } from './schema/registerSchema';
import { useRegister } from './hooks/userRegister';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const { loading, register, user, error } = useRegister();
    
    const [formData, setFormData] = useState<registerData>({
        username: "",
        email: "",
        password: "",
        role: "ROLE_USER"
    });
    const [repeatPassword, setRepeatPassword] = useState<string>("");
    const navigate = useNavigate();
    const [errors, setErrors] = useState({
        username: "",
        email: "",
        password: "",
        repeatPassword: ""
    });


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        setFormData({
            ...formData,
            [name]: value
        })

        setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setErrors({ username: "", email: "", password: "", repeatPassword: "" });

        if (repeatPassword !== formData.password) {
            setErrors({ ...errors, repeatPassword: "Las contraseñas no coinciden." });
            return;
        }

        const result = registerSchema.safeParse(formData);
        if (!result.success) {
            const zodErrors = result.error.flatten().fieldErrors;
            setErrors({
                username: zodErrors.username?.[0] || "",
                email: zodErrors.email?.[0] || "",
                password: zodErrors.password?.[0] || "",
                repeatPassword: "" 
            });
            return;
        }

        try {
            const response = await register(formData);
            if(response != null) {
                setTimeout(() => {
                    navigate("/login")
                }, 5000);

            }
        } catch (err) {
            console.error("Error al registrar:", err);
        }
    }

  return (
    <div className="w-screen h-screen  flex justify-center items-center pt-10">   
        <div className="bg-[#fffcfc] p-8 rounded-lg shadow-lg w-full max-w-lg flex flex-col border-[0.5px] border-gray-300">
            <h1 className="text-[oklch(0.556_0_0)] text-4xl font-bold mb-3 text-center pt-8">Drive</h1>
            <h2 className="text-[oklch(0.556_0_0)] text-center mb-5">Inicia sesión para acceder a tus archivos</h2>
            <form className='flex gap-4 flex-col' onSubmit={handleSubmit}>
                <Input 
                    inputName='username'
                    name='username'
                    onChange={handleChange}
                    value={formData.username}
                    label='Nombre de usuario'
                    error={errors.username || error?.field == "username" ? error?.mensaje : ""}
                />
                <Input 
                    inputName='email'
                    name='email'
                    onChange={handleChange}
                    value={formData.email}
                    label='Correo electrónico'
                    error={errors.email || error?.field == "email" ? error?.mensaje : ""}
                />
                <Input 
                    inputName='password'
                    name='password'
                    type='password'
                    onChange={handleChange}
                    value={formData.password}
                    label='Contraseña'
                    error={errors.password}
                />
                <Input 
                    inputName='repeatPassword'
                    onChange={e => setRepeatPassword(e.target.value)}
                    value={repeatPassword}
                    label='Repetir contraseña'
                    type='password'
                    error={errors.repeatPassword}
                />

                <button className="bg-[#00b0c3] text-white p-2 rounded-md cursor-pointer" disabled={loading || user != null}>{!loading && user ? "Redirigiendo...": loading ? "Cargando...": "Registrarse"}</button>

            </form>
            <p className='text-center text-sm text-[#737373] mt-5 mb-5'>¿Ya tienes una cuenta? <span className='text-[#00b0c3] font-semibold cursor-pointer hover:underline' onClick={() => navigate("/login")}>Iniciar sesión</span></p>
        </div>
    </div>
  )
}

export default RegisterPage