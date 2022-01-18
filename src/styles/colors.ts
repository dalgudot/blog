import { createGlobalStyle } from 'styled-components';

const Colors = createGlobalStyle`
    :root {
      --fg: #343434;
      --bg: #dbdbdb;
    }

    [data-theme='dark'] {
      --fg: #dbdbdb;
      --bg: #343434;
    }
`;

export default Colors;
