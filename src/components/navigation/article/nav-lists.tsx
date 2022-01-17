import styled from 'styled-components';
import List from './list';

type NavListsProps = {
  datas: {
    category: string;
    order: string;
  }[];
};

const NavLists: React.FC<NavListsProps> = ({ datas }) => {
  return (
    <Nav>
      <Ul>
        {datas.map((data, idx) => (
          <List
            key={idx}
            category={data.category}
            order={data.order}
            // content={data.content}
          />
        ))}
      </Ul>
    </Nav>
  );
};

export default NavLists;

const Nav = styled.nav``;

const Ul = styled.ul``;
