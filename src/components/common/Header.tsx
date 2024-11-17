import React from "react";

interface IProps {
  subtitle: string;
}

function Header({subtitle}: IProps) {
  return (
    <div className="flex gap-[1.19rem] flex-col">
      <p className="text-darkBlue text-2xl md:text-[3.25rem] font-[600] text-center">
        {subtitle}
      </p>
    </div>
  );
}

export default Header;
