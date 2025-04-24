import { MdClose } from "react-icons/md";
import { motion } from "framer-motion";

interface Props {
    setModal: Function
}

export function Warning ( {setModal}: Props ) {

    return (
        <main className="h-screen w-full fixed inset-0 z-40 pt-10 bg-gray-500 bg-opacity-50 flex justify-center">
            <motion.div initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5}} className="w-[350px] bg-slate-400 h-[200px] rounded-lg p-10 flex flex-col justify-between items-center">
                <div className="flex items-center gap-7">
                    <h1 className="text-4xl font-bold text-white">Warning!!!</h1>
                    <button onClick={() => setModal(false)} className="text-white text-[20px] bg-red-900 p-2 rounded-md"><MdClose /></button>
                </div>

                <h1 className="text-center text-white font-outfit">Atualize a página para visualizar as alterações</h1>
            </motion.div>
        </main>
    );
    
}