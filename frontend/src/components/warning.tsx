import { MdClose } from "react-icons/md";

interface Props {
    setModal: Function
}

export function Warning ( {setModal}: Props ) {

    return (
        <main className="h-screen w-full fixed inset-0 z-10 bg-gray-500 bg-opacity-50 flex justify-center">
            <div className="w-[350px] bg-orange-400 h-[200px] translate-y-9 rounded-lg p-10 flex flex-col justify-between items-center">
                <div className="flex items-center gap-7">
                    <h1 className="text-4xl font-bold text-slate-800">Warning</h1>
                    <button onClick={() => setModal(false)} className="text-white text-[20px] bg-red-900 p-2 rounded-md"><MdClose /></button>
                </div>

                <h1 className="text-center text-slate-800 font-outfit">Atualize a página para visualizar as alterações</h1>
            </div>
        </main>
    );
    
}