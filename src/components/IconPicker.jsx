import React, { useEffect, useState, useRef } from "react";
import feather from "feather-icons";
const IconButton = ({ icon, onClick, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    style={{
      backgroundColor: "transparent",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      margin: "0 10px",
    }}
  >
    <i data-feather={icon}></i>
  </button>
);
const IconPicker = ({
  rowsInOnePage,
  columnsInOnePage,
  iconHeight,
  iconWidth,
  pickerHeight = 500,
  pickerWidth = 500,
}) => {
  const [visible, setVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [iconsPerPage, setIconsPerPage] = useState(100);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [total, setTotal] = useState(
    Math.ceil(Object.keys(feather.icons).length / iconsPerPage)
  );
  useEffect(() => {
    setTotal(Math.ceil(Object.keys(feather.icons).length / iconsPerPage));
    feather.replace();
  }, [currentPage, iconsPerPage, visible]);
  useEffect(() => {
    const gap = 20;
    const iconArea = (iconHeight + gap) * (iconWidth + gap);
    const containerArea = pickerHeight * pickerWidth;
    const maxIconsPerPage = Math.floor(containerArea / iconArea) ;
    setIconsPerPage(maxIconsPerPage);
  }, [iconWidth, iconHeight, pickerHeight, pickerWidth]);
  return (
    <div
      style={{
        display: "flex",
        border: "2px solid white",
        padding: "10px",
        flexDirection: "column",
        height: `${pickerHeight}px`,
        width: `${pickerWidth}px`,
        gap: "10px",
      }}
    >
      <button
        style={{
          alignSelf: "flex-end",
          justifySelf: "flex-end",
          cursor: "pointer",
        }}
        onClick={() => {
          setVisible(!visible);
          feather.replace();
        }}
      >
        {visible ? `X` : `Icon Picker`}
      </button>
      {visible && (
        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            /* border: "2px solid green", */
          }}
        >
          <IconButton
            icon="arrow-left"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          />
          <span>
            Page {currentPage} of {total}
          </span>
          <IconButton
            icon="arrow-right"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === total}
          />
        </span>
      )}
      {!visible && selectedIcon && (
        <div
          style={{
            width: "100px",
            height: "100px",
            border: "2px solid white",
            margin: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <i
            data-feather={selectedIcon}
            style={{
              fontSize: "20rem",
              margin: "auto",
            }}
          ></i>
        </div>
      )}
      {visible && (
        <div
          style={{
            display: "grid",
            gridTemplateRows: `repeat(${rowsInOnePage}, 1fr)`,
            gridTemplateColumns: `repeat(${columnsInOnePage}, 1fr)`,
            gap: "20px",
            padding: "10px",
          }}
        >
          {Object.keys(feather.icons)
            .slice((currentPage - 1) * iconsPerPage, currentPage * iconsPerPage)
            .map((icon) => {
              return (
                <div
                  key={icon}
                  onClick={() => {
                    setSelectedIcon(icon);
                    setVisible(false);
                  }}
                  style={{
                    border: "2px solid white",
                    padding: "3px",
                    cursor: "pointer",
                    borderRadius: "5px",
                    height: `${iconHeight}px`,
                    width: `${iconWidth}px`,
                  }}
                >
                  <i data-feather={icon}></i>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default IconPicker;
