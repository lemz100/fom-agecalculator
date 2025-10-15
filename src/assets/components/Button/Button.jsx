import styles from './Button.module.less';
import icon from '@/assets/images/icon-arrow.svg';


function Button({ onSubmit, form }) {

  return (
    <button 
        className={styles.button}
        onSubmit={onSubmit}
        form={form}    
    >
        <img src={icon} />
    </button>
  );
}

export default Button;
