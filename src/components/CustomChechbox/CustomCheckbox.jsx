import style from "./CustomCheckbox.module.css";

function CustomCheckbox({ id, label, func }) {
  const { value, translate } = label;
  return (
    <label htmlFor={id} className={style.label}>
      <input
        data-word="word"
        className={style.input}
        type="checkbox"
        onClick={func}
        id={id}
      />
      <span>{value} </span> - {translate}
    </label>
  );
}

export default CustomCheckbox;
