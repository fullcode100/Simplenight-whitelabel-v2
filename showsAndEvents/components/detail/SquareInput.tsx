import React from 'react';

interface SquareInputLargProps {
  value: number;
}

const SquareInputLarg: React.FC<SquareInputLargProps> = ({ value }) => {
  return (
    <div className="w-11 h-11">
      <div className="[box-shadow:0px_0px_0px_1px_rgba(181,_181,_181,_1)_inset] border [box-shadow-width:1px] px-1 py-3 flex-1 h-11 bg-white gap-2 inline-flex items-center flex-grow rounded overflow-clip">
        <div
          className={
            '"flex-1 relative w-9 text-center font-normal h-[18px] font-[\'Lato\'] text-[rgba(69,69,69,1)]"'
          }
        >
          <p className=" text-base leading-none m-0 left-[36.11%] right-[36.11%] top-[5.56%] bottom-[5.56%] tracking-[-0.16px]">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SquareInputLarg;
