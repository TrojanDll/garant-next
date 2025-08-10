import React from "react";

type TProps = React.SVGProps<SVGSVGElement>;

const IconArrowLeft: React.FC<TProps> = (props) => {
  return (
    <svg
      width="17"
      height="18"
      viewBox="0 0 17 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M14.1663 9H2.83301M2.83301 9L7.08301 4.75M2.83301 9L7.08301 13.25"
        stroke="#3233F3"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconArrowLeft;
