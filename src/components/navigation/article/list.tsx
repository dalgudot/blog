import Link from 'next/link';
import styled from 'styled-components';

type Props = {
  category: string;
  order: string;
};

const List: React.FC<Props> = ({ category, order }) => {
  const isAdmin = false;
  const url = isAdmin
    ? `/${category}/${order}/writing`
    : `/${category}/${order}`;

  return (
    <>
      <Li>
        <Link href='/[category]/[order]' as={url}>
          <a>
            <h1>List {order}</h1>
          </a>
        </Link>
      </Li>
    </>
  );
};

export default List;

const Li = styled.li``;
