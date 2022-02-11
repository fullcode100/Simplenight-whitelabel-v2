import React from 'react';

import { Button as AntdButton } from 'antd';

import styles from './Button.module.scss';

interface ButtonProps {
  value: string;
  size?: string;
  [key: string]: any;
}

const Button = ({ value, size, ...others }: ButtonProps) => {
  // return (
  //   <AntdButton
  //     value={value}
  //     type="primary"
  //     shape="round"
  //     className={styles.root}
  //   />
  // );

  return (
    <button className={styles.root} {...others}>
      {value}
    </button>
  );
};

export default Button;
