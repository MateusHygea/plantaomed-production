import {ChangeEventHandler, SelectHTMLAttributes} from 'react'
import {
  ContainerLabel,
  Label,
  SelectInput
} from './styles'

interface OptionType {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement>{
  label?: string,
  value?: string,
  onChange?: ChangeEventHandler<HTMLSelectElement> | undefined,
  options:  OptionType[]
}

export function Select({label, value, onChange, options, ...rest}: SelectProps) {
  return(
    <ContainerLabel>
      <Label>
        {label}
        <SelectInput value={value} onChange={onChange} {...rest}>
          {options.map((option: OptionType) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </SelectInput>
      </Label>
    </ContainerLabel>
  )
}

