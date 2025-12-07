// App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { CsvUploadPage } from './components/CsvUploadPage';


import { ResultsDashboard } from './components/ResultsDashboard';

export default function App() {
  const [uploadResult, setUploadResult] = useState(null);

  return (
    <Router>
      <Box sx={{ backgroundColor: '#f7f7f7', minHeight: '100vh', pb: 6 }}>
        <Box sx={{ py: 2, backgroundColor: 'white', borderBottom: '1px solid #e0e0e0' }}>
          <Container maxWidth="lg" sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="h6">CSV Importer</Typography>
            <Box sx={{ marginLeft: 'auto', display: 'flex', gap: 1 }}>
              <Link to="/" style={{ textDecoration: 'none' }}>
                <Button>Upload</Button>
              </Link>
              <Link to="/results" style={{ textDecoration: 'none' }}>
                <Button>Results</Button>
              </Link>
            </Box>
          </Container>
        </Box>

        <Routes>
          <Route path="/" element={<CsvUploadPage setUploadResult={setUploadResult} />} />
          <Route path="/results" element={<ResultsDashboard uploadResult={uploadResult} />} />
        </Routes>
      </Box>
    </Router>
  );
}
