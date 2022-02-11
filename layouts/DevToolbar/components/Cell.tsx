import styles from './InfoSectionStyle.module.scss';

const Cell = ({ label, value }: { label: string; value: string }) => (
  <>
    <span className={styles.label}>{label}</span>
    <span>{value}</span>
  </>
);

export default Cell;
