import React from "react";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

export const ExportToExcel = ({
  columns = [],
  secondColumn,
  rows,
  loading,
  fileName,
}) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (rows, fileName) => {
    const ws = XLSX.utils.json_to_sheet(rows);
    /* custom headers */
    XLSX.utils.sheet_add_aoa(
      ws,
      [columns || [], secondColumn].filter(Boolean),
      {
        origin: "A1",
      }
    );
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <button
      className="btn btn-light btn-active-light-dark btn-sm fw-bolder me-3"
      onClick={(e) => exportToCSV(rows, fileName)}
      disabled={loading}
    >
      Export
    </button>
  );
};
