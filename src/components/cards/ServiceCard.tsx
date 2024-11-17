import React from "react";
interface IProps {
  iconUrl: string;
  description: string;
  action?: () => void;
}

function ServiceCard({iconUrl, description, action}: IProps) {
  return (
    <div className="flex flex-grow flex-col gap-[2.56rem]  pt-[1rem] pb-[2.81rem] px-[2.56rem] items-center service-card-shadow rounded-[1.75rem]">
      <div>
        <img src={iconUrl} alt="service icon" />
      </div>
      <p className="text-normal">{description}</p>
    </div>
  );
}

export default ServiceCard;
