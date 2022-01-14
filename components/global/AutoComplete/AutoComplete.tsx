import { AutoComplete as AntAutoComplete } from 'antd';
import React from 'react';
import { ReactElement } from 'react';
import { AutoCompleteOption } from '../../../types/global/AutoCompleteOption';

interface AutoCompleteProps {
  children?: ReactElement;
  options: AutoCompleteOption[];
  [key: string]: any;
}

const AutoComplete = ({ children, options, ...other }: AutoCompleteProps) => {
  const handleSearch = (value: string) => {
    console.log(value);
  };

  return (
    <AntAutoComplete onSearch={handleSearch} options={options} {...other}>
      <input type="text" />
    </AntAutoComplete>
  );
};

export default AutoComplete;
