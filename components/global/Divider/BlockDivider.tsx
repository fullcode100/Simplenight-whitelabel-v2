interface DividerProps {
  className?: string;
}

const BlockDivider = ({ className = '' }: DividerProps) => (
  <div className={`block w-full bg-gray-300 h-[1px] ${className}`} />
);

export default BlockDivider;
