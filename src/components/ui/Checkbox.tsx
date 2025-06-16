import '../../styles/ui/checkbox.css';
interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string; // optional visible label
}

const Checkbox: React.FC<CheckboxProps> = ({ label, ...props }) => {
  return (
    <label className="checkbox-wrapper">
      <input type="checkbox" {...props} />
      {label && <span className="checkbox-label">{label}</span>}
    </label>
  );
};

export default Checkbox;