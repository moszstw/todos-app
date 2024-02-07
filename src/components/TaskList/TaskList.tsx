import React, { CSSProperties, memo, useMemo, useRef, useState } from "react";
import styles from "./styles.module.scss";
import { OptionType, TodosType } from "types";
import { ReactComponent as Icon } from "../../media/dot.svg";
import useDropdown from "../../hook/useDropdown";
import { optionMenuList } from "../../common/option";
import Dropdown from "../../components/Dropdown";
import useClickOutside from "../../hook/useClickOutside";

interface TaskListProps extends TodosType {
  selectedFilterOption: OptionType | null;
  onDeleteTask: (id: string) => void;
  onUpdateTask: (id: string, checked: boolean) => void;
  onChangeTitle: (id: string, title: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  id,
  title,
  completed,
  selectedFilterOption,
  onDeleteTask,
  onUpdateTask,
  onChangeTitle,
}) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [titleChanged, setTitleChanged] = useState<string>(title);
  const { isOpen, toggleDropdown, handleClose, handleOptionClick } =
    useDropdown({
      options: optionMenuList,
    });

  const containerRef = useRef<HTMLDivElement>(null);

  const titileStyleCheck: CSSProperties = useMemo(() => {
    if (completed) return { textDecoration: "line-through", color: "#A9A9A9" };
    return { textDecoration: "" };
  }, [selectedFilterOption, completed]);

  const handleDropdown = async (param: OptionType) => {
    await handleOptionClick(param);
    const paramId = param?.id.toString();

    if (paramId === "1") {
      onDeleteTask(id);
    } else if (paramId === "0") {
      setIsEdit(true);
    } else {
      console.error("Cannot delete task without a valid ID");
    }
  };

  const handleUpdateTask: React.ChangeEventHandler<HTMLInputElement> = (
    params
  ) => {
    onUpdateTask(id, params.target.checked);
  };

  const handleSaveChange: React.MouseEventHandler<HTMLButtonElement> = () => {
    onChangeTitle(id, titleChanged);
    setIsEdit(false);
  };

  const handleChangeTitle: React.ChangeEventHandler<HTMLInputElement> = (
    params
  ) => {
    setTitleChanged(params.target.value);
  };

  useClickOutside(containerRef, handleClose);

  return (
    <div className={styles.taskList} key={id}>
      {isEdit ? (
        <div className={styles.editList}>
          <div className={styles.editTypeWrapper}>
            <input
              value={titleChanged}
              className={styles.editType}
              type="text"
              placeholder="Type here..."
              onChange={handleChangeTitle}
            />
          </div>
          <div>
            <button className={styles.saveButton} onClick={handleSaveChange}>
              Save
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className={styles.checkedBoxWrapper}>
            <label className={styles.checkboxContainer}>
              <input
                type="checkbox"
                checked={completed}
                onChange={handleUpdateTask}
              />
              <span className={styles.checkmark}></span>
            </label>
          </div>
          <div className={styles.labelWrapper} style={titileStyleCheck}>
            {title}
          </div>
          <div className={styles.editButtonWrapper} ref={containerRef}>
            <div className={styles.dotButton} onClick={toggleDropdown}>
              <Icon />
            </div>
            <div className={styles.dropdownOption}>
              <Dropdown
                options={optionMenuList}
                onOptionClick={handleDropdown}
                isOpen={isOpen}
                isHover={false}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default memo(TaskList);
