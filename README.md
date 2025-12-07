CSV Frontend – File Upload & Results Dashboard:-

This frontend allows users to upload CSV files, send them to the backend API, and view a detailed dashboard of:

Total rows
Successfully inserted rows
Failed rows with error messages
Dynamic table for invalid records
Built with React + Material UI and fully connected to your backend API.

Tech Stack:-

Frontend:-

 1 )React (CRA)
 2) React Router DOM
 3) Material UI (MUI v5)
 4) Axios for API calls
 5) MUI DataGrid for tabular records
 6) Environment variables (.env)

Project Structure:-

frontend-app/
│── src/
│   ├── App.jsx
│   ├── components/
│   │   ├── CsvUploadPage.jsx
│   │   ├── ResultsDashboard.jsx
│   │   └── FailedRecords.jsx
│   ├── index.js
│   └── styles/
│
│── .env
│── package.json
└── README.md

Setup Instructions
1️) Clone the repository
git clone https://github.com/002-rajat/frontend-app.git
cd frontend-app

2) Install dependencies
npm install

3) Create a .env file
REACT_APP_API_URL=http://localhost:4000
This URL must point to your backend API.

4) Start the frontend
 npm stat
 App will run at:
 http://localhost:3000


How It Works:-

CSV Upload Page (/):-

 1) User chooses a .csv file
 2) The file is uploaded using axios as multipart/form-data
 3) Backend returns:
     a) total row
     b) success count
     c) failed count
     d) detailed failed records with errors
4) The app redirects to the Results Dashboard

Results Dashboard (/results):-
Shows:
 a) Total records
 b) Success count
 c) Failed count
 d) Paginated DataGrid of failed rows

 API Documentation (Frontend → Backend):-
 
POST /api/upload
Uploads a CSV file.
URL
POST {REACT_APP_API_URL}/api/upload
Headers
Content-Type: multipart/form-data
Body (Form data)
file: <csv-file>

Axios example

const formData = new FormData();
formData.append('file', file);

const resp = await axios.post(
  `${process.env.REACT_APP_API_URL}/api/upload`,
  formData,
  { headers: { "Content-Type": "multipart/form-data" } }
);


Example Successful Backend Response:-

{
  "totalRows": 5,
  "successCount": 4,
  "failedCount": 1,
  "failedRecords": [
    {
      "rowNumber": 3,
      "values": {
        "name": "",
        "email": "bademail",
        "phone": "123"
      },
      "errors": [
        "Name is required",
        "Invalid email format",
        "Phone must be exactly 10 digits"
      ]
    }
  ]
}


UI Screens Included
1️) Upload CSV Page
   a) File picker
   b) Upload button
   c) Loading indicator
   d) Error handling
   e) Redirect to results on success

2️) Results Dashboard
   a) Summary cards
   b) Failed records table
   c) Dynamic DataGrid columns
   d) Pagination

   Notes:-
   1) Only .csv files are allowed
   2) Large files supported (based on backend limit)
   3) Auto navigation after successful upload
   4) Table automatically adjusts to CSV column names

 


