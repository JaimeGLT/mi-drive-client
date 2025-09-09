import React, { useState } from 'react'
import Input from '../../components/Input'
import { Link, useNavigate } from 'react-router-dom';
import { Key, MoveLeft } from 'lucide-react';
import { useChangePassword } from './hooks/useChangePassword';
import type { newCredentials } from './service/changePasswordService';
import toast from 'react-hot-toast';

const ChangePassword = () => {

    const [ credentials, setCredentials ] = useState<newCredentials>({
        password: "",
        repeatPassword: ""
    });

    const [ errors, setErrors ] = useState({
        password: "",
        repeatPassword: ""
    });
    const [ isPasswordChanged, setIsPasswordChanged] = useState(false);

    const { error, loading, changePassword, setError } = useChangePassword();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(credentials.password.length < 3) {
            setErrors({...errors, password: "La nueva contraseña debe tener almenos 3 carácteres"});
            return;
        }

        if(credentials.password.length > 250) {
            setErrors({...errors, password: "La nueva contraseña no puede tener mas de 250 carácteres"});
        }

        if(credentials.password !== credentials.repeatPassword) {
            setErrors({...errors, repeatPassword: "Las contraseñas deben ser iguales"});
            return;
        }

        const getEmail = localStorage.getItem("correo") || "";

        try {
            const response = await changePassword(getEmail, credentials);
            setIsPasswordChanged(true);
            localStorage.removeItem("correo");
            toast.success("Contraseña actualizada correctamente");
            if(response != null) {
                setTimeout(() => {
                    navigate("/login")
                }, 2000);
            }
        } catch (error) {
            console.log(error);
            
        }
    }

  return (
    <div className="w-screen h-screen  flex justify-center items-center pt-10">
        <div className="bg-[#fffcfc] p-8 rounded-lg shadow-lg w-full max-w-lg flex flex-col border-[0.5px] border-gray-300">

            <h1 className="text-[oklch(0.556_0_0)] text-4xl font-bold mb-3 text-center pt-8">Drive</h1>
            <h2 className="text-[oklch(0.556_0_0)] text-center mb-5">Nueva contraseña</h2>
            <div className='flex justify-center flex-col items-center mb-5'>
                <Key className='text-[#00b0c3] h-13 w-13 flex mb-5 text-center justify-center items-center'/>
                <p className='text-[oklch(0.556_0_0)] text-center'>Crea una nueva contraseña para tu cuenta</p>
            </div>
            <form className="flex gap-4 flex-col" onSubmit={handleSubmit}>
                <Input 
                    inputName='password'
                    label='Nueva contraseña'
                    type='password'
                    value={credentials.password}
                    onChange={e => {setCredentials({...credentials, password: e.target.value});
                                    setErrors({...errors, password: ""}) }}
                    error={errors.password}
                />
                <Input 
                    inputName='repeatPassword'
                    label='Confirmar nueva contraseña'
                    type='password'
                    value={credentials.repeatPassword}
                    onChange={e => {setCredentials({...credentials, repeatPassword: e.target.value});
                                    setErrors({...errors, repeatPassword: ""}); setError("") }}
                    error={errors.repeatPassword || error}
                />

                <button className="bg-[#00b0c3] text-white p-2 rounded-md cursor-pointer" disabled={loading || isPasswordChanged}>{loading ? "Guardando...": "Cambiar contraseña"}</button>
            </form>

            <p className='flex justify-center text-[oklch(0.556_0_0)] mt-6 mb-8'><MoveLeft className='mr-3'/><Link to="/login">Volver al inicio de sesión</Link></p>
        </div>
    </div>
  )
}

export default ChangePassword;