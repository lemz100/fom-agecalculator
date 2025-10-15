import styles from './Input.module.less';
import ErrorMsg from './ErrorMsg/ErrorMsg';

function Input({ id, label, bounds, name, errorText, onChange, value, placeholder }) {

/** 
 * label = desired label for the textfield
 * optional = for required or not required fields.
 * error = boolean value for whether there is an error or not
 * errorText = customized text for the error message that appears below.
 */

  return (
    <label 
        className={styles.textLabel}
        htmlFor={id}>
        <p className={`${styles.text} ${errorText ? styles.error : ''}`}>{label}</p>
        <input
            className={`${styles.input} ${errorText ? styles.error : ''}`}
            type="text"
            inputMode="numeric"
            maxLength={bounds}
            name={name} /** name for input (key) */
            id={id} /** corresponding id for the input */
            value={value} /** value of input - usually state-managed */
            onChange={onChange} /** State-updating function when the value changes */
            placeholder={placeholder}
        />
        <ErrorMsg text={errorText} />
    </label>
    
  );
}

export default Input

