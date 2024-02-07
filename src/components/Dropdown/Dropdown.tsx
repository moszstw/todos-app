import styles from "./styles.module.scss";
import { OptionType } from "../../types";
import { ReactComponent as Icon } from "../../media/chevDown.svg";
import { MouseEvent, useMemo } from "react";

interface DropdownProps {
  options: OptionType[];
  onOptionClick: (option: OptionType) => void;
  isOpen: boolean;
  isHover?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  onOptionClick,
  isOpen,
  isHover = true,
}) => {
  const handleOptionClick = (option: OptionType) => {
    onOptionClick?.(option);
  };

  return (
    <div className={styles.dropdownWrapper}>
      {isOpen && (
        <div className={styles.dropdownOptions}>
          {options.map((option) => (
            <div
              key={option.id}
              className={`${styles.option} ${isHover ? styles.isHover : ""}`}
              onClick={() => handleOptionClick(option)}
              style={
                option.title === "Delete" ? { color: "red" } : { color: "" }
              }
            >
              {option.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
