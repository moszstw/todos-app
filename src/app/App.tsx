import React, { useEffect, useMemo, useState } from "react";
import styles from "./App.module.scss";
import Landing from "../pages/landing";

function App() {
  return (
    <div className={styles.App}>
      <Landing />
    </div>
  );
}

export default App;
