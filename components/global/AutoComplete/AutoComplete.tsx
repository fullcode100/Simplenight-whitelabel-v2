import { AutoComplete as AntAutoComplete, Input } from 'antd';
import React from 'react';
import { ReactElement } from 'react';
import { AutoCompleteOption } from '../../../types/global/AutoCompleteOption';

interface AutoCompleteProps {
  children?: ReactElement;
  options: AutoCompleteOption[];
  inputClassName?: string;
  placeholder?: string;
  [key: string]: any;
}

const AutoComplete = ({
  children,
  inputClassName,
  options,
  placeholder,
  ...other
}: AutoCompleteProps) => {
  const handleSearch = (value: string) => {
    console.log(value);
  };

  return (
    <AntAutoComplete onSearch={handleSearch} options={options} {...other}>
      <Input placeholder={placeholder} className={inputClassName} />
    </AntAutoComplete>
  );
};

export default AutoComplete;
