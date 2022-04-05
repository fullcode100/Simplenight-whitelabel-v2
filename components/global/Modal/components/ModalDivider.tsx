const ModalDivider = ({ className = '' }: { className?: string }) => (
  <div
    className={`h-px w-[120%] absolute left-0 bg-gray-200 mt-2 ${className}`}
  />
);

export default ModalDivider;
