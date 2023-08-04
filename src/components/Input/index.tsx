import React from "react";

import {
    InputTeste
} from './styles'

interface InputProps {
    placeholder?: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function InputComponent({placeholder, value, onChange}:InputProps){
    return(
        <>
            <InputTeste
                  placeholder={placeholder}
                  value={value}
                  onChange={onChange}
                />
        </>
    )
}