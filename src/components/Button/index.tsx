import styles from './Button.module.scss';

type ButtonProps = {
  text: string;
  onClickButton?: () => void;
  sx?: {
    [key: string]: string;
  };
};

const Button = ({ text, onClickButton, sx }: ButtonProps) => {
  return (
    <button style={sx} className={styles.button} onClick={onClickButton}>
      {text}
    </button>
  );
};

export default Button;
