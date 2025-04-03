import { AiOutlineHome } from "react-icons/ai";
import { Asteristico } from "../components/asteristico";
import { useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { api } from "../apis/api";
import { useNavigate } from "react-router-dom";

export function SignUp(){

    const [olho, setOlho] = useState(false);
    const [olhoConfirmar, setOlhoConfirmar] = useState(false);

    const [aviso_1, setAviso_1] = useState(false);
    const [mensagem_1, setMensagem_1] = useState("");
    const [aviso_2, setAviso_2] = useState(false);
    const [mensagem_2, setMensagem_2] = useState("");
    const [aviso_3, setAviso_3] = useState(false);
    const [mensagem_3, setMensagem_3] = useState("");

    const [senha, setSenha] = useState("");
    const [senhaConfirmar, setSenhaConfirmar] = useState("");

    const navigate = useNavigate();

    const { register, handleSubmit } = useForm(); 

    const criarUsuario = async ( data: any ) => {

        try{
            setOlho(false);
            setOlhoConfirmar(false);

            const params = new URLSearchParams({
                name: data.name,
                password: data.password
            });

            const response = await api.post(`v1/inicio/sign-up`, params);

            if(response.status == 200){
                setAviso_3(true);
                setMensagem_3(response.data.message)
            }
            if(response.status == 201){
                localStorage.setItem("nome_usuario", data.name);
                navigate('/home');
            }

        } catch(error) {
            console.error(error);
        }

    }

    const submit = ( data: any ) => {
        
        if(senha.length >= 8 && (senhaConfirmar === senha)){

            criarUsuario(data);

        } else {

            if(senha.length < 8 && senhaConfirmar != senha){
                setMensagem_1("Senha precisa conter, no mínimo, 8 caracteres");
                setAviso_1(true);
                setMensagem_2("As senhas precisam ser iguais");
                setAviso_2(true);
            }
            else if(senha.length < 8){
                setMensagem_1("Senha precisa conter, no mínimo, 8 caracteres");
                setAviso_1(true);
            }
            else {
                setMensagem_2("As senhas precisam ser iguais");
                setAviso_2(true);
            }

        }
    }

    return (
        <div className="bg-[#f0f0f0] w-full h-screen flex items-center justify-center">
            <form onSubmit={handleSubmit(submit)} className="w-[600px] h-full sm:h-[700px] bg-[#FF5500] py-8 px-10 sm:px-24 rounded-lg shadow-xl shadow-slate-500 flex flex-col items-center justify-center">
                <div className="flex items-center gap-5 pt-5 mb-12">
                    <div className='text-[60px] text-[#FFFFFF] '><AiOutlineHome/></div>
                    <h1 className="text-[#FFFFFF] font-sans text-[30px] sm:text-[35px] pt-1 justify-center uppercase">MGI</h1>
                </div>
                <h1 className="text-[50px] sm:text-[40px] text-white font-outfit font-semibold mb-10">Sign Up</h1>
                <div className="w-full">
                    <div className="pb-6 flex flex-col gap-6">
                        <div>
                            {aviso_3 && <h1 className="text-blue-900 pl-2 pb-1 text-[14px]">* {mensagem_3} *</h1>}
                            <input {...register('name')} type="text" name="name" id="name" required
                            className={twMerge('bg-slate-50 border-slate-400 w-full text-[16px] font-normal rounded-xl border pl-3 transition duration-150 ease-in-out py-[8px] placeholder:italic placeholder:text-[17px]')} placeholder="Username"/>
                        </div>
                        <div>
                            {aviso_1 && <h1 className="text-blue-900 pl-2 pb-1 text-[14px]">* {mensagem_1} *</h1>}
                            <div className="flex items-center">
                                <input {...register('password')} type={olho ? "text" : "password"} onChange={(e) => setSenha(e.target.value)} name="password" id="password" required
                                className={twMerge('bg-slate-50 border-slate-400 w-full text-[16px] font-normal rounded-xl border pl-3 transition duration-150 ease-in-out py-[8px] placeholder:italic placeholder:text-[17px]')} placeholder="Senha"/>
                                {olho ? 
                                    <button onClick={(e) => {e.preventDefault(); setOlho(!olho)}}><FaEyeSlash className="opacity-80 absolute text-end -translate-x-9 -translate-y-[7px]"/></button>
                                    : 
                                    <button onClick={(e) => {e.preventDefault(); setOlho(!olho)}}><FaEye className="opacity-80 absolute text-end -translate-x-9 -translate-y-[7px]"/></button>
                                }
                            </div>
                        </div>
                        <div>
                            {aviso_2 && <h1 className="text-blue-900 pl-2 pb-1 text-[14px]">* {mensagem_2} *</h1>}
                            <div className="flex items-center">
                                <input type={olhoConfirmar ? "text" : "password"} onChange={(e) => setSenhaConfirmar(e.target.value)} name="passwordConfim" id="passwordConfim" required
                                className={twMerge('bg-slate-50 border-slate-400 w-full text-[16px] font-normal rounded-xl border pl-3 transition duration-150 ease-in-out py-[8px] placeholder:italic placeholder:text-[17px]')} placeholder="Confirmar senha"/>
                                {olhoConfirmar ? 
                                    <button onClick={(e) => {e.preventDefault(); setOlhoConfirmar(!olhoConfirmar)}}><FaEyeSlash className="opacity-80 absolute text-end -translate-x-9 -translate-y-[7px]"/></button>
                                    : 
                                    <button onClick={(e) => {e.preventDefault(); setOlhoConfirmar(!olhoConfirmar)}}><FaEye className="opacity-80 absolute text-end -translate-x-9 -translate-y-[7px]"/></button>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex justify-center">
                        <button className="text-[16px] w-full font-medium py-3 rounded-md text-slate-100 hover:text-[#ffffff] bg-[#3A0C3D] hover:bg-[#711977e1] active:bg-[#711977a6] transition ease-in-out delay-400 duration-300">Sign Up</button>
                    </div>
                    <div className="flex flex-col items-center my-6 text-white">
                        <h1 className="">Já possui uma conta?</h1>
                        <a href="./" className="underline">Acessar conta</a>
                    </div>
                </div>
            </form>
        </div>
    )
}