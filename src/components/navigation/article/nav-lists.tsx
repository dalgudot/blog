import List from './list';

type NavListsProps = {
  allPostsListData: {
    category: string;
    order: string;
    title: string;
  }[];
};

const NavLists: React.FC<NavListsProps> = ({ allPostsListData }) => {
  return (
    <nav>
      <ul>
        {allPostsListData.map((data, idx) => (
          <List
            key={idx}
            category={data.category}
            order={data.order}
            title={data.title}
          />
        ))}
      </ul>
    </nav>
  );
};

export default NavLists;
