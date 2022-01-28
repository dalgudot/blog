import Link from 'next/link';

type Props = {
  category: string;
  order: string;
  title: string;
};

const List: React.FC<Props> = ({ category, order, title }) => {
  const isAdmin = false;
  // const url = isAdmin
  //   ? `/${category}/${order}/writing`
  //   : `/${category}/${order}`;

  return (
    <>
      <li>
        <Link href='/[category]/[order]' as={`/${category}/${order}`}>
          <a>
            <h1>
              {category} {title}
            </h1>
          </a>
        </Link>
      </li>
    </>
  );
};

export default List;
