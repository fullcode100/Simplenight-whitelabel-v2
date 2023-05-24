import classnames from 'classnames';

interface CategoryTagProps {
  tags: string[];
}

const CategoryTags = ({ tags }: CategoryTagProps) => {
  return (
    <>
      {tags.map((label, index) => (
        <div key={index} className="bg-teal-100 rounded max-w-[115px]">
          <p className="text-[#0DADB9] p-1 text-xs font-semibold truncate">
            {label}
          </p>
        </div>
      ))}
    </>
  );
};

export default CategoryTags;
