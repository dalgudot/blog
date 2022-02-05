import { FC } from 'react';

type Props = {
  color: TSVGColor;
};

const IconNewTap24: FC<Props> = ({ color }) => {
  return (
    <>
      <svg
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d='M4 20L20 4M20 4V16M20 4H8' stroke={color} />
      </svg>
    </>
  );
};

export default IconNewTap24;
