import React, { ReactNode } from 'react';
import { Popover as AntPopover } from 'antd';

interface PopoverProps {
  children?: any;
  placement?: 'top' | 'left' | 'right' | 'bottom';
  content?: ReactNode;
  title?: ReactNode;
  trigger?: 'click' | 'hover';
}

const Popover = ({
  children,
  placement,
  content,
  title,
  trigger,
}: PopoverProps) => {
  return (
    <AntPopover
      placement={placement}
      content={content}
      title={title}
      trigger={trigger}
    >
      {children}
    </AntPopover>
  );
};

export default Popover;
