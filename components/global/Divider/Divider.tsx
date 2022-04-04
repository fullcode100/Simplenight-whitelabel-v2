import styles from './Divider.module.scss';
import classnames from 'classnames';

const Divider = ({ className = '' }: { className?: string }) => (
  <div className={classnames(styles.divider, className)}></div>
);

export default Divider;
