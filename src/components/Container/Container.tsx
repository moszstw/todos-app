import React, { CSSProperties, ReactNode } from "react";
import style from "./styles.module.scss";
import { ClassificationTypeNames } from "typescript";

interface ContainerProps {
  children: ReactNode;
  styles?: CSSProperties;
}

const ContainerComponent: React.FC<ContainerProps> = ({ children, styles }) => {
  const containerStyles: CSSProperties = {
    ...styles,
  };

  return (
    <div className={style.container} style={containerStyles}>
      {children}
    </div>
  );
};

export default ContainerComponent;
