interface DividerProps {
  className?: string;
}

const Divider = ({ className = '' }: DividerProps) => (
  <div className={`relative ${className} mb-4`}>
    <div className="absolute inset-0 flex items-center" aria-hidden="true">
      <div className="w-full border-t border-gray-300" />
    </div>
  </div>
);

export default Divider;
