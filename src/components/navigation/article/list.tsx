import Link from 'next/link';

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
      <li>
        <Link href='/[category]/[order]' as={url}>
          <a>
            <h1>List {order}</h1>
          </a>
        </Link>
      </li>
    </>
  );
};

export default List;
