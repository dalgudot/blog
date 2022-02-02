import { FC } from 'react';

type Props = {
  color: TColor;
};

const IconTheme24: FC<Props> = ({ color }) => {
  return (
    <>
      <svg
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM12 21V3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z'
          fill={`var(${color})`}
        />
      </svg>
    </>
  );
};

export default IconTheme24;
