type InputProps = {
  inputType: React.HTMLInputTypeAttribute | null;
  inputValue: string | boolean;
  onChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  inputName: string;
  placeHolder?: string;
};

export default function Input({
  inputType,
  inputValue,
  inputName,
  placeHolder = inputValue.toString(),
  onChange,
}: InputProps) {
  return (
    <div>
      <label htmlFor={inputName}>{`${inputName} : `}</label>
      {inputType === "checkbox" ? (
        <input
          id={`input-${inputName}`}
          name={inputName}
          onChange={onChange}
          type="checkbox"
          placeholder={placeHolder}
          checked={inputValue as boolean}
        />
      ) : inputType === "text" ? (
        <input
          id={`input-${inputName}`}
          name={inputName}
          onChange={onChange}
          type="text"
          placeholder={placeHolder}
          value={inputValue as string}
        />
      ) : (
        <textarea
          id={`input-${inputName}`}
          name={inputName}
          placeholder={placeHolder}
          onChange={onChange}
          value={inputValue as string}
        ></textarea>
      )}
    </div>
  );
}
