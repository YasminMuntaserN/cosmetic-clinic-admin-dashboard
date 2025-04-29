import { ComponentProps, ElementType } from 'react';
import { Control, useController, RegisterOptions } from 'react-hook-form';

type TextInputProps<T extends ElementType = 'input'> = {
    control: Control<any>;
    label?: string;
    name: string;
    rules?: RegisterOptions;
    component?: T;
} & ComponentProps<T>;

export default function TextInput<T extends ElementType = 'input'>({
                                                                       control,
                                                                       label,
                                                                       name,
                                                                       rules,
                                                                       component,
                                                                       ...inputProps
                                                                   }: TextInputProps<T>) {
    const Component = component || 'input';

    const {
        field,
        fieldState: { error },
    } = useController({ control, name, rules });

    return (
        <div className="flex flex-col gap-1">
            {label && <label className={StyledLabel}>{label}</label>}
            <Component {...field} {...(inputProps as any)} className={StyledInput} />
            {error && <span className="text-red-500 text-xs">{error.message}</span>}
        </div>
    );
}

const StyledLabel = "block text-sm m-2 mt-4";
const StyledInput = "mt-1 w-full p-2 border rounded-md text-gray-500 text-sm focus:outline-basic disabled:cursor-not-allowed";
