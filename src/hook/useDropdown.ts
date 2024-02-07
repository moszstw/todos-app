import { useState } from "react";
import { OptionType } from "../types";

interface UseDropdownProps {
  options: OptionType[];
}

const useDropdown = ({ options }: UseDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);

  const toggleDropdown = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleOptionClick = (option: OptionType) => {
    setSelectedOption(option);
    toggleDropdown();
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    toggleDropdown,
    selectedOption,
    handleOptionClick,
    options,
    handleClose,
  };
};

export default useDropdown;
