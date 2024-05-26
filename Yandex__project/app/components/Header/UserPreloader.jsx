export const UserPreloader = () => {
  return (
    <div>
      <svg style={{ width: "64px" }} viewBox="0 0 128 128">
        <g>
          <path
            fill="#f1f500"
            d="M64,0a64,64,0,0,1,64,64H0A64,64,0,0,1,64,0Z"
          />
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 64 64;-40 64 64;0 64 64"
            dur="600ms"
            repeatCount="indefinite"
          ></animateTransform>
        </g>
        <g>
          <path
            fill="#f1f500"
            d="M64,128A64,64,0,0,1,0,64H128A64,64,0,0,1,64,128Z"
          />
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 64 64;40 64 64;0 64 64"
            dur="600ms"
            repeatCount="indefinite"
          ></animateTransform>
        </g>
      </svg>
    </div>
  );
};
