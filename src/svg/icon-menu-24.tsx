import { FC } from 'react';

type Props = {
  color: TSVGColor;
};

const IconMenu24: FC<Props> = ({ color }) => {
  return (
    <>
      <svg
        width='48'
        height='48'
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <rect x='3' y='5' width='18' height='1' fill={color} />
        <rect x='3' y='11' width='18' height='1' fill={color} />
        <rect x='3' y='17' width='18' height='1' fill={color} />
      </svg>
    </>
  );
};

export default IconMenu24;
