import styles from './TextField.module.scss';

type TextFiledProps = {
  value?: string;
  placeholder?: string;
  onChangeInput?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  sx?: {
    [key: string]: string;
  };
};

const TextField = ({ sx, value, placeholder, onChangeInput }: TextFiledProps) => {
  return (
    <>
      <input
        style={sx}
        className={styles.input}
        value={value}
        onChange={onChangeInput}
        placeholder={placeholder}
      />
    </>
  );
};

export default TextField;
