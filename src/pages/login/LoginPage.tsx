import { useState } from "react";
import Input from "../../components/Input";
import { useLogin } from "./hooks/authHook";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [ identifier, setIdentifier] = useState("");
    const [ password, setPassword ] = useState("");
    const [ errors, setErrors ] = useState({
        identifier: "",
        password: "",
        badCredentials: ""
    });

    const { login, loading } = useLogin();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if(!identifier) {
            setErrors({...errors, identifier: "Ingresa tu nombre de usuario o correo electrónico.", badCredentials: ""})
            return;
        } else if (identifier.length > 250) {        
            setErrors({...errors, identifier: "El nombre de usuario no puede superar los 250 caracteres.", badCredentials: ""})
            return;
        }

        if(!password) {
            setErrors({...errors, password: "Ingresa tu contraseña.", badCredentials: ""})
            return;
        } else if (password.length > 250) {        
            setErrors({...errors, password: "La contraseña no puede superar los 250 caracteres.", badCredentials: ""})
            return;
        }

        try {
            const response = await login(identifier, password);
            setErrors({...errors, badCredentials: ""})
            localStorage.setItem("token", response.token);  
            navigate("/");
        } catch (error) {
            setErrors({ badCredentials: "Credenciales incorrectas", identifier: "", password: ""});
        }
    };

  return (
    <div className="w-screen h-screen  flex justify-center items-center pt-10">
        <div className="bg-[#fffcfc] p-8 rounded-lg shadow-lg w-full max-w-lg flex flex-col border-[0.5px] border-gray-300">

            <h1 className="text-[oklch(0.556_0_0)] text-4xl font-bold mb-3 text-center pt-8">Drive</h1>
            <h2 className="text-[oklch(0.556_0_0)] text-center mb-5">Inicia sesión para acceder a tus archivos</h2>
            <form className="flex gap-4 flex-col" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-8">
                    <Input 
                        inputName="identifier"
                        label="Nombre de usuario o correo"
                        required={false}
                        value={identifier}
                        onChange={e => {setIdentifier(e.target.value); if(errors.identifier) setErrors({...errors, identifier: ""})}}
                        error={errors.identifier}
                    />

                    <Input 
                        inputName="password"
                        label="Contraseña"
                        type="password"
                        required={false}
                        value={password}
                        onChange={(e) => {setPassword(e.target.value); if(errors.password) setErrors({...errors, password: ""})}}
                        error={errors.password}
                    />
                </div>

                {
                    errors.badCredentials && <span className="text-red-500 text-sm pb-0">{errors.badCredentials}</span>
                }

                <p className="text-end text-sm">¿Olvidaste tu contraseña? <span className="text-[#00b0c3] cursor-pointer"><Link to="/forgot-password">Recuperar</Link></span></p>
                <button className="bg-[#00b0c3] text-white p-2 rounded-md cursor-pointer" disabled={loading}>{loading ? "Cargando...": "Iniciar Sesión"}</button>

                <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-gray-300"></span>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="bg-[#fffcfc] px-2 text-gray-500">
                        ¿Aún no tienes una cuenta?
                        </span>
                    </div>
                </div>

                <p className="text-center text-sm">
                    <span className="text-[#00b0c3] font-medium cursor-pointer hover:underline">
                        <Link to="/register">Regístrate</Link>
                    </span>
                </p>

            </form>
        </div>
    </div>
  )
}

export default LoginPage