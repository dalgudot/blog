import List from './list';

type NavListsProps = {
  datas: {
    category: string;
    order: string;
  }[];
};

const NavLists: React.FC<NavListsProps> = ({ datas }) => {
  return (
    <nav>
      <ul>
        {datas.map((data, idx) => (
          <List
            key={idx}
            category={data.category}
            order={data.order}
            // content={data.content}
          />
        ))}
      </ul>
    </nav>
  );
};

export default NavLists;
