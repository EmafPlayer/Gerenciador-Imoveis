import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { api } from "../apis/api";
import { Asteristico } from "./asteristico";
import { twMerge } from "tailwind-merge";
import { BsCaretDownFill, BsCaretUpFill } from "react-icons/bs";
import CarregarPessoas from "../apis/carregar_pessoas";
import { MdClose } from "react-icons/md";

type props = {
    setModal: Function,
    id_chave: number | null,
}

type pessoasProps = {
    id_pessoa: number,
    nome_completo: string,
    contato: string
}

export function ModificarChave ( props: props) {
    
    const[criacao, setCriacao] = useState(false);
    const[mensagem, setMensagem] = useState("");

    const[id_pessoa, setIdPessoa] = useState(0);
    const[count_pessoa, setCountPessoa] = useState(0);
    const[status_pessoa, setStatus_pessoa] = useState(false);

    const[pessoas, setPessoas] = useState<pessoasProps[]>([]);

    const { register, handleSubmit } = useForm();

    useEffect(() => {
        const fetchData = async () => {
            const dataPessoas = await CarregarPessoas();

            console.log(dataPessoas?.pessoas)

            if (dataPessoas?.pessoas) 
                setPessoas(dataPessoas.pessoas);

            if(pessoas.length != 0)
                setIdPessoa(dataPessoas?.pessoas[0].id_pessoa);

            else {
                console.warn("Tabela não encontrada ou dados inválidos:");
            }
        };

        fetchData();
    }, []);

    const submit = async () => {
        
        if(pessoas.length != 0 ){

            try{
                
                const response = await api.put(`/v1/inicio/modificar-chave/${props.id_chave}/${id_pessoa}`);
    
                setCriacao(true);
                setMensagem(response.data.message);
    
            } catch (error) {
                console.error(error);
            }

        }
        
    }
    
    return (
        <div>
                <div className="fixed inset-0 z-10 flex justify-center items-center bg-gray-500 bg-opacity-75 h-screen w-full">
                    <form onSubmit={handleSubmit(submit)} className="bg-white p-12 w-[560px] lg:w-[600px]">
                        <div className="flex items-center justify-between mb-12">
                            <h1 className="text-[45px] font-bold">Modificar Chave</h1>
                            <div className="flex items-center gap-3">
                                <button onClick={(e) => { props.setModal(false); e.preventDefault()}} className="text-white text-[20px] bg-red-900 p-3 rounded-md ml-6"><MdClose /></button>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-[18px] text-slate-700 font-outfit mb-[5px]">Pessoas</h4>
                            <Asteristico/>
                        </div>
                        <button onClick={(e) => {e.preventDefault(); setStatus_pessoa(!status_pessoa)}} className="w-full h-12 text-[16px] rounded-md bg-[#353941] hover:bg-[#4a4e57] active:border-2 flex justify-end items-center px-5 whitespace-pre">
                            <h6 className="text-slate-100 hover:text-[#ffffff] font-normal">{pessoas.length != 0 ? `${pessoas[count_pessoa].nome_completo}     -     ${pessoas[count_pessoa].contato}` : 'Não há Imobiliárias cadastradas'}</h6>
                            {status_pessoa ? <BsCaretUpFill className="text-[#ffffff] ml-[75px]"/>  : <BsCaretDownFill className="text-[#ffffff] ml-[75px]"/> }
                        </button>
                        {status_pessoa &&
                            <ul className="relative translate-y-[6px]">
                                {pessoas.length != 0 && pessoas.map((pessoa, index) => 
                                    <li className="mb-1"><button onClick={(e) => {e.preventDefault(); setCountPessoa(index); setStatus_pessoa(!status_pessoa), setIdPessoa(pessoa.id_pessoa)}} className="w-full whitespace-pre h-11 text-[16px] font-normal rounded-md text-slate-100 hover:text-[#ffffff] bg-[#353941] hover:bg-[#4a4e57] active:border-2">{`${pessoa.nome_completo}          -           ${pessoa.contato}`}</button></li>
                                )}
                            </ul>}
                                    
                        <div className="text-center sm:text-right mt-12">
                            <button className="text-[16px] font-normal px-16 py-3 rounded-md text-slate-100 hover:text-[#ffffff] bg-[#3A0C3D] hover:bg-[#711977e1] active:bg-[#711977a6]">Modificar</button>
                        </div>
                        <div className="text-center sm:text-right pr-2">
                            {criacao && <h1 className="text-[#2369c5] pl-1 pt-2 text-[14px]">*{mensagem}</h1>}
                        </div>
                        
                    </form>
                </div>
        </div>
        )
}