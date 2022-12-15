import classnames from 'classnames';

interface CategoryTagProps {
  tags: string[];
}

const CategoryTags = ({ tags }: CategoryTagProps) => {
  return (
    <>
      {tags.map((label, index) => (
        <div key={index} className="bg-teal-100 w-fit rounded">
          <label className="text-[#0DADB9] text-[14px] p-2 leading-[20px] font-semibold">
            {label}
          </label>
        </div>
      ))}
    </>
  );
};

export default CategoryTags;
