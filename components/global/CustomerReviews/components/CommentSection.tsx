interface CommentProps {
  titleSection: string;
  text: string;
}

const CommentSection = ({ titleSection, text }: CommentProps) => {
  return (
    <section className="mt-3 text-dark-800 text-sm lg:text-base">
      <p className="mb-2 font-semibold">{titleSection}</p>
      <p>{text}</p>
    </section>
  );
};

export default CommentSection;
