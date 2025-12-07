// FailedRecords.jsx
import React, { useMemo } from "react";
import { DataGrid } from "@mui/x-data-grid";

export function FailedRecords({ failedRecords }) {
  const rows = useMemo(() => {
    return (failedRecords || []).map((row) => ({
      id: row.rowNumber || crypto.randomUUID(), // unique ID
      ...row,
    }));
  }, [failedRecords]);

  const columns = useMemo(() => {
    const cols = [];

    // Row number column
    cols.push({
      field: "rowNumber",
      headerName: "Row",
      width: 80,
      sortable: true,
    });

    // Dynamic value columns
    if (failedRecords && failedRecords.length > 0) {
      const sample = failedRecords[0].values || {};

      Object.keys(sample).forEach((key) => {
        cols.push({
          field: key,               // must be simple field name
          headerName: key,
          width: 150,
          valueGetter: (params) => params.row.values?.[key] ?? "",
        });
      });
    }

    // Errors column
    cols.push({
      field: "errors",
      headerName: "Errors",
      width: 350,
      renderCell: (params) => {
        const err = params.row.errors;

        if (Array.isArray(err)) return err.join("; ");
        if (typeof err === "string") return err;
        return "";
      },
    });

    return cols;
  }, [failedRecords]);

  return (
    <div style={{ height: 500, width: "100%" }}>
      <h3>Failed Records ({failedRecords?.length || 0})</h3>

      <DataGrid
        rows={rows}
        columns={columns}
        pagination
        pageSizeOptions={[10, 25, 50]}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        disableRowSelectionOnClick
      />
    </div>
  );
}
