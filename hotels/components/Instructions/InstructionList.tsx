import Divider from 'components/global/Divider/Divider';

interface Instruction {
  paragraph: string;
  list: string[];
}
interface InstructionListProps {
  instructions: Instruction[];
}
interface ListProp {
  list: string[];
}
const InstructionList = ({ instructions }: InstructionListProps) => {
  const List = ({ list }: ListProp) => (
    <>
      <ul className="list-disc px-5">
        {list.map((item, index) => (
          <li key={index} className="text-base">
            {item}
          </li>
        ))}
      </ul>
    </>
  );
  return (
    <section>
      {instructions.map((instruction, index) => {
        const isLast = index === instructions.length - 1;
        return (
          <>
            <section key={`instruction${index}`} className="grid gap-2">
              <section className="text-base">{instruction?.paragraph}</section>
              {instruction?.list?.length > 0 && (
                <List list={instruction?.list} />
              )}
            </section>
            {!isLast && <Divider className="py-6" />}
          </>
        );
      })}
    </section>
  );
};

export default InstructionList;
