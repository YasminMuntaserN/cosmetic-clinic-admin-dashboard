import { ComponentProps } from "react";

export type ButtonVariant = 'default' | 'dashedBasic' | 'dashedSecondary' | 'fullBorder' |"fullBackground" |"grayBackground" |"SquareButton"|"SquareDashedButton"|"BgDashedButton" |"DeleteButton" |"CancleButton";

type ButtonProps = ComponentProps<'button'> & {
    children?: React.ReactNode;
    variant?: ButtonVariant;
};

const BUTTON_STYLES = {
    default: "bg-secondary text-basic w-full py-2 px-4 rounded-md font-slab ",
    dashedBasic: "border-2 border-dashed border-basic text-basic px-4 py-2 font-slab",
    dashedSecondary: "flex gap-3 border-2 border-dashed border-secondary text-secondary px-4 py-2 font-slab",
    fullBorder: "flex border-2 border-primary w-full py-2 px-4 rounded-md font-bold text-secondary justify-center font-slab",
    fullBackground: " bg-basic text-white  font-semibold flex gap-2 rounded-lg px-8 py-3 font-slab",
    grayBackground: "flex w-full gap-5 text-sm  px-4 py-3 font-slab rounded-md transition-colors bg-gray-200  hover:text-basic hover:bg-gray-400 font-slab",
    SquareButton :"flex items-center justify-center p-2 rounded-lg hover:bg-gray-400 transition-colors bg-secondary text-basic font-slab",
    SquareDashedButton :" w-12 h-10 border-2 border-dashed border-basic flex items-center justify-center p-2 rounded-lg transition-colors bg-white font-slab",
    BgDashedButton :" bg-[#F4ECDA] text-basic text-lg border-2 font-bold border-dashed border-basic flex items-center justify-center p-2 px-5 rounded-lg  font-slab",
    DeleteButton :"w-full bg-red-800 text-white text-lg  flex items-center justify-center p-2 px-5 rounded-lg font-slab",
    CancleButton :" w-full border-2 border-gray-500 text-lg font-bold  flex items-center justify-center p-2 px-5 rounded-lg font-slab"
    
};

export function Button({ children, variant = 'default', ...rest }: ButtonProps) {
    return (
        <button className={BUTTON_STYLES[variant]} {...rest}>
            {children}
        </button>
    );
}
