// Define your column definitions based on the JSON structure (assuming data is in JSON format)
const columnDefs = [
    { headerName: "Key ID's", field: "Key ID's" }, // Assuming "Key ID's" exists in your data
    { headerName: "Director", field: "Director" },
    { headerName: "ADM", field: "ADM" },
    { headerName: "Team Name", field: "Team Name" },
    { headerName: "Total", field: "Total", type: 'number' }, // Specify number type for totals
    { headerName: "Onsite", field: "Onsite", type: 'number' }, // Specify number type
    { headerName: "Offshore", field: "Offshore", type: 'number' }, // Specify number type
    { headerName: "KT Start Date", field: "KT Start Date"}, // Assuming dates exist
    { headerName: "KT End Date", field: "KT End Date" }, // Assuming dates exist
    { headerName: "CW ID", field: "CW ID", type: 'number'  },
    { headerName: "ADID", field: "ADID", type: 'number'  },
    { headerName: "RSA", field: "RSA", type: 'number'  },
    { headerName: "Citrix/Laptop", field: "Citrix/Laptop", type: 'number'  },
    { headerName: "Knowledge Acquisition", field: "Knowledge Acquisition" },
    { headerName: "Assisted Perform", field: "Assisted Perform" },
    { headerName: "Indpendent Perform", field: "Indpendent Perform" },
    { headerName: "Steady State", field: "Steady State" },
    { headerName: "Billing Start Date", field: "Billing Start Date" },
    { headerName: "Key Updates", field: "Key Updates" },
    { headerName: "Remarks", field: "Remarks" },
  ];
  
  // Define an empty array to hold the row data from the excel sheet
  const rowData = [];
  
  // Function to read the excel sheet and populate rowData
  function readExcelData(file) {
    const reader = new FileReader();
  
    return new Promise((resolve, reject) => {
      reader.onload = function(event) {
        const data = event.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
  
        // Convert worksheet data to an array of arrays (suitable for rowData)
        const excelRows = XLSX.utils.sheet_to_row_object_array(worksheet);
        rowData.push(...excelRows); // Spread operator to add each row to rowData
  
        console.log("Excel data loaded successfully!");
        console.log("Excel data in rowData:", rowData);
  
        // Get a reference to the DOM element for the grid (assuming it exists)
        const gridDiv = document.querySelector('#myGrid');
  
        console.log("Grid element found:", gridDiv); // Check if grid element exists
  
        // Create the agGrid instance using createGrid
        const gridApi = agGrid.createGrid(gridDiv, {
          columnDefs: columnDefs,
          rowData: rowData,
        });
  
        resolve(gridApi); // Resolve the promise with gridApi
      };
  
      reader.readAsArrayBuffer(file); // Read the excel file as an ArrayBuffer
    });
  }
  
  // (Optional) Add a file input element to select the excel sheet
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = '.xlsx'; // Accept only excel files
  
  fileInput.onchange = function(event) {
    const selectedFile = event.target.files[0];
    if (selectedFile.name === 'Project_1.xlsx') {
      readExcelData(selectedFile)
        .then(gridApi => { // **gridApi is resolved here**
          if (gridApi) { // Check if gridApi is available before using it
            gridApi.updateGridOptions({ rowData: rowData });
          } else {
            console.error("Grid creation failed.");
          }
        })
        .catch(error => {
          console.error("Error reading Excel data:", error);
        });
    } else {
      console.error("Please select the file 'Project_1.xlsx'");
    }
  };
  
  document.body.appendChild(fileInput); // Add the file input element to the body
  