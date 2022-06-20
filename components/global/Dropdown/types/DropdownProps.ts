import DropdownItemProps from './DropdownItemProps';

type DropdownProps = {
  // General
  title: string;
  color?: string;
  disabled?: boolean;
  orientation?: 'right' | 'left';
  type?: 'dropdown' | 'contained' | 'outlined';
  // Icons
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  options: DropdownItemProps[];
};

export default DropdownProps;
