export function DataEstilizada({ data }: { data: Date }) {
    const meses = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    return (
        <div className="flex flex-col items-center justify-center">
            <span className="text-[30px] italic font-montserrat">{meses[data.getMonth()]}</span>
            <span className="text-[70px] font-bold font-montserrat">{data.getDate()}</span>
            <span className="text-[26px] font-montserrat">{data.getFullYear()}</span>
        </div>
    );
}