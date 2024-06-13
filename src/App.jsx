import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import IconPicker from "./components/IconPicker";

function App() {
  return (
    <>
      <IconPicker
        rowsInOnePage={10}
        columnsInOnePage={10}
        iconHeight={30}
        iconWidth={30}
        pickerHeight={500}
        pickerWidth={500}
      />
    </>
  );
}

export default App;
