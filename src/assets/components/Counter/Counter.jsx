import styles from './Counter.module.less';

function Counter({ year, month, day}) {

  return (
    <span className={styles.age}>
        <span className={styles.years}>
            <p className={styles.value}>{year}</p>
            <p className={styles.label}>years</p>
        </span>
        <span className={styles.months}>
            <p className={styles.value}>{month}</p>
            <p className={styles.label}>months</p>
        </span>
        <span className={styles.days}>
            <p className={styles.value}>{day}</p>
            <p className={styles.label}>days</p>
        </span>
    </span>
  );
}

export default Counter;
