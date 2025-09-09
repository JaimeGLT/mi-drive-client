import React, { useState } from 'react'
import toast from 'react-hot-toast';
import Input from '../../components/Input'
import { useVerifyMail } from './hooks/useVerifyMail';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, MoveLeft } from 'lucide-react';

const ForgotPassword = () => {

    const [ email, setEmail ] = useState<string>("");
    const [ errors, setErrors ] = useState("");

    const { error, loading, verifyEmail, setError } = useVerifyMail();
    const navigate = useNavigate();
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setErrors("");
        if(error) setError("");
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!emailRegex.test(email)) {
            setErrors("Debe ingresar un email válido.");
            return;
        }

        try {
            const response = await verifyEmail(email);
            localStorage.setItem("correo", email);
            toast.success("Correo enviado correctamente")
            if(response != null) {
                setTimeout(() => {
                    navigate("/verify-mail")
                }, 1000);
            }
        } catch (error) {
            
        }
    }

  return (
    <div className="w-screen h-screen  flex justify-center items-center pt-10">
        <div className="bg-[#fffcfc] p-8 rounded-lg shadow-lg w-full max-w-lg flex flex-col border-[0.5px] border-gray-300">

            <h1 className="text-[oklch(0.556_0_0)] text-4xl font-bold mb-3 text-center pt-8">Drive</h1>
            <h2 className="text-[oklch(0.556_0_0)] text-center mb-5">Recuperar contraseña</h2>
            <div className='flex justify-center flex-col items-center'>
                <Mail className='text-[#00b0c3] h-13 w-13 flex mb-5 text-center justify-center items-center'/>
                <p className='text-[oklch(0.556_0_0)]'>Ingresa tu correo electrónico y te enviaremos un código de</p>
                <p className='text-[oklch(0.556_0_0)] mb-5'>verificación</p>
            </div>
            <form className="flex gap-4 flex-col" onSubmit={handleSubmit}>
                <Input 
                    inputName='email'
                    label='Correo electrónico'
                    value={email}
                    onChange={handleChange}
                    error={errors || error}
                />

                <button className="bg-[#00b0c3] text-white p-2 rounded-md cursor-pointer" disabled={loading}>{loading ? "Enviando...": "Enviar correo"}</button>
            </form>

            <p className='flex justify-center text-[oklch(0.556_0_0)] mt-6 mb-8'><MoveLeft className='mr-3'/><Link to="/login">Volver al inicio de sesión</Link></p>
        </div>
    </div>
  )
}

export default ForgotPassword