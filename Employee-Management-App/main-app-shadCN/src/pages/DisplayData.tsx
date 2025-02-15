        import { AgGridReact } from "@ag-grid-community/react";
        import React, { useEffect, useState } from "react";
        import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
        import "@ag-grid-community/core"; // Core grid CSS
        import type { ColDef } from "@ag-grid-community/core";
        import "@ag-grid-community/styles/ag-grid.css"; // Core grid styles
        import "@ag-grid-community/styles/ag-theme-alpine.css"; // Alpine theme
        import { useNavigate } from "react-router-dom";
        
        // Define the type for employee data
        interface Employee {
          name: string;
          email: string;
          phone?: string; // Optional field
          role: string;
          joiningDate: string;
        }
        
const DisplayData: React.FC = () => {
          const [employeeData, setEmployeeData] = useState<Employee[]>([]);
          const navigate = useNavigate();
          
        
          useEffect(() => {
        
            // Fetch data from the server
            fetch("http://localhost:5000/data", {
              method: "GET",
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
              })
              .then((data) => {
                console.log(data);
                setEmployeeData(data);
              })
              .catch((error) => console.error("Failed to fetch data:", error));
          }, []);
        
        const columnDefs: ColDef<Employee>[] = [
            { headerName: "Name", field: "name", sortable: true, filter: true },
            { headerName: "Email", field: "email", sortable: true, filter: true },
            { headerName: "Phone", field: "phone", sortable: true, filter: true },
            { headerName: "Role", field: "role", sortable: true, filter: true },
            { headerName: "Joining Date", field: "joiningDate", sortable: true, filter: true },
          ]
          console.log(columnDefs);

          const addData = () => {
            navigate("/input-data");
          };
        
          return (
            <div>
                <div className="showdata">
              <div style={{ fontWeight: "bold", fontSize: "20px" }}>Employee Data</div>
              <button style={{
                backgroundColor: "black",
               color: "white",
               border: "none",
               padding: "10px 20px",
               borderRadius: "5px",
               cursor: "pointer",
               fontSize: "12px",
               fontWeight: "bold",
             }} onClick={addData}>Add Data</button>
              </div>
              <div
                className="ag-theme-alpine"
                style={{ height: 400, width: "100%", marginTop: "20px" }}
              >
                <AgGridReact
                 rowData={employeeData} // Pass employees data to the grid
                  columnDefs={columnDefs} // Set up columns
                  pagination={true} // Enable pagination
                  paginationPageSize={5} // Show 5 rows per page
                  modules={[ClientSideRowModelModule]} // Register ClientSideRowModelModule
                  defaultColDef={{
                    sortable: true, // Enable sorting
                    filter: true, // Enable filtering
                    flex: 1, // Column width adjustment
                    resizable: true, // Allow resizing columns
                    cellStyle: { whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, // Fix text alignment issues
                  }}

                />
              </div>
            </div>
          );
        }

export default DisplayData