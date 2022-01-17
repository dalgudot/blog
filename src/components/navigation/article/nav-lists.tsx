import styled from 'styled-components';
import List from './list';

type Props = {
  datas: {
    category: string;
    order: number;
    content: string;
  }[];
};

const NavLists: React.FC<Props> = ({ datas }) => {
  return (
    <Nav>
      <Ul>
        {datas.map((data) => (
          <List
            key={data.content}
            category={data.category}
            order={data.order}
            content={data.content}
          />
        ))}
      </Ul>
    </Nav>
  );
};

export default NavLists;

const Nav = styled.nav``;

const Ul = styled.ul``;
