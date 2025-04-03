import { useMediaQuery } from "react-responsive";
import { twMerge } from "tailwind-merge";

export function DataEstilizada({ data }: { data: Date }) {
    const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    
    const isLowScreen = useMediaQuery({ query: '(min-width: 640px)' })
    
    return (
        <div className={twMerge("", isLowScreen ? "flex flex-col items-center justify-center" : "flex items-center justify-center w-full gap-9 py-4")}>
            <span className="text-[25px] lg:text-[30px] italic font-montserrat">{meses[data.getMonth()]}</span>
            <span className="text-[60px] lg:text-[70px] font-bold font-montserrat">{data.getDate()}</span>
            <span className="text-[20px] lg:text-[26px] font-montserrat">{data.getFullYear()}</span>
        </div>
    );
}