import React, { useState } from 'react'
import Input from '../../components/Input'
import { Link, useNavigate } from 'react-router-dom';
import { MoveLeft, Shield } from 'lucide-react';
import { useVerifyCode } from './hooks/useVerifyCode';
import toast from 'react-hot-toast';

const VerifyMail = () => {

    const [ code, setCode ] = useState<string>("");
    const [ errors, setErrors ] = useState("");

    const { error, loading, verifyCode, setError } = useVerifyCode();
    const navigate = useNavigate();
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;

        if (/^\d*$/.test(val)) {
            setCode(val);
            setErrors("");
            if (error) setError("");
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!code) {
            setErrors("Debes ingresar un código.");
            return;
        }

        const getEmail = localStorage.getItem("correo") || "";

        try {
            const response = await verifyCode(code, getEmail);
            toast.success("Código verificado correctamente")
            if(response != null) {
                setTimeout(() => {
                    navigate("/change-password")
                }, 1000);
            }
        } catch (error) {
            console.log(error);
            
        }
    }

  return (
    <div className="w-screen h-screen  flex justify-center items-center pt-10">
        <div className="bg-[#fffcfc] p-8 rounded-lg shadow-lg w-full max-w-lg flex flex-col border-[0.5px] border-gray-300">

            <h1 className="text-[oklch(0.556_0_0)] text-4xl font-bold mb-3 text-center pt-8">Drive</h1>
            <h2 className="text-[oklch(0.556_0_0)] text-center mb-5">Verificar código</h2>
            <div className='flex justify-center flex-col items-center mb-5'>
                <Shield className='text-[#00b0c3] h-13 w-13 flex mb-5 text-center justify-center items-center'/>
                <p className='text-[oklch(0.556_0_0)] text-center'>Hemos enviado un código de verificación a <strong>{localStorage.getItem("correo")}</strong></p>
            </div>
            <form className="flex gap-4 flex-col" onSubmit={handleSubmit}>
                <Input 
                    inputName='code'
                    label='Código de verificación'
                    value={code}
                    type='text'
                    onChange={handleChange}
                    error={errors || error}
                    inputClassname='text-center text-xl'
                />

                <button className="bg-[#00b0c3] text-white p-2 rounded-md cursor-pointer" disabled={loading}>{loading ? "Verificando...": "Verificar código"}</button>
            </form>

            <p className='flex justify-center text-[oklch(0.556_0_0)] mt-6 mb-8'><MoveLeft className='mr-3'/><Link to="/login">Volver al inicio de sesión</Link></p>
        </div>
    </div>
  )
}

export default VerifyMail;