import { twMerge } from "tailwind-merge";

export function NavLink( { ...props } ){
    return(
        <a {...props} className={twMerge('scroll-smooth font-medium px-12 pt-[14px] pb-[24px] hover:underline underline-offset-[12px] ease-in-out duration-300 text-[20px] rounded-md hover:bg-[#2d5f41b7] text-slate-300 hover:text-slate-300')} >
            {props.children}
        </a>
    )
}