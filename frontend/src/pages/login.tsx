import { AiOutlineHome } from "react-icons/ai";
import { Asteristico } from "../components/asteristico";
import { useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { api } from "../apis/api";
import { useNavigate } from "react-router-dom";

export function Login(){

    const { register, handleSubmit } = useForm(); 

    const [aviso, setAviso] = useState(false);
    const [mensagem, setMensagem] = useState("");
    const seederChamado = useRef(false);

    const navigate = useNavigate();

    const [olho, setOlho] = useState(false);

    useEffect (() => {

        const fetchData = async () => {

            try{

                if(!seederChamado.current) {
                    const response = await api.post('v1/inicio/run-seeder-role');
                    console.log(response);
                }

            } catch(error) {
                console.error(error);
            }

        }

        fetchData();

    }, []);

    const submit = async ( data:any ) => {
        
        try {

            setOlho(false);
            const params = new URLSearchParams ({
                name: data.name,
                password: data.password
            });

            const response = await api.post('v1/inicio/sign-in', params);

            if(response.status == 200){
                setAviso(true);
                setMensagem(response.data.message);
                return;
            };
            

            localStorage.setItem("nome_usuario", data.name);
            navigate('/home');
            return;
            
            
        } catch(error) {

        }
    }

    return (
        <div className="bg-[#f0f0f0] w-full h-screen flex items-center justify-center">
            <form onSubmit={handleSubmit(submit)} className="w-[600px] h-[700px] bg-[#FF5500] py-8 px-24 rounded-lg shadow-xl shadow-slate-500 flex flex-col items-center justify-center">
                <div className="flex items-center gap-5 mb-12">
                    <div className='text-[60px] text-[#FFFFFF] '><AiOutlineHome/></div>
                    <h1 className="text-[#FFFFFF] font-sans text-[30px] sm:text-[35px] pt-1 justify-center uppercase">MGI</h1>
                </div>
                <h1 className="text-[40px] text-white font-outfit font-semibold mb-8">Sign In</h1>
                <div className="w-full">
                    <div className="flex flex-col gap-6">
                        <div>
                            {aviso && <h1 className="text-blue-900 pl-2 pb-1 text-[14px]">* {mensagem} *</h1>}
                            <input {...register('name')} type="text" name="name" id="name" required
                            className={twMerge('bg-slate-50 border-slate-400 w-full text-[16px] font-normal rounded-xl border pl-3 transition duration-150 ease-in-out py-[8px] placeholder:italic placeholder:text-[17px]')} placeholder="Username"/>
                        </div>
                        <div>
                                {aviso && <h1 className="text-blue-900 pl-2 pb-1 text-[14px]">* {mensagem} *</h1>}
                            <div className="flex items-center">
                                <input {...register('password')} type={olho ? "text" : "password"} name="password" id="password" required
                                className={twMerge('bg-slate-50 border-slate-400 w-full text-[16px] font-normal rounded-xl border pl-3 transition duration-150 ease-in-out py-[8px] placeholder:italic placeholder:text-[17px]')} placeholder="Senha"/>
                                {olho ? 
                                    <button onClick={(e) => {e.preventDefault(); setOlho(!olho)}}><FaEyeSlash className="opacity-80 absolute text-end -translate-x-9 -translate-y-[7px]"/></button>
                                    : 
                                    <button onClick={(e) => {e.preventDefault(); setOlho(!olho)}}><FaEye className="opacity-80 absolute text-end -translate-x-9 -translate-y-[7px]"/></button>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="mt-14 pb-2 flex justify-center">
                        <button className="text-[16px] w-full font-medium py-3 rounded-md text-slate-100 hover:text-[#ffffff] bg-[#3A0C3D] hover:bg-[#711977e1] active:bg-[#711977a6] transition ease-in-out delay-400 duration-300">Sign in</button>
                    </div>
                    <div className="flex flex-col items-center my-6 text-white">
                        <h1 className="">Ainda não possui uma conta?</h1>
                        <a href="/sign-up" className="underline">Criar uma conta</a>
                    </div>
                </div>
            </form>
        </div>
    )
}