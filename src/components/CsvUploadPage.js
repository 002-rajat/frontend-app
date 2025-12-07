// CsvUploadPage.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import axios from "axios";


import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';

export function CsvUploadPage({ setUploadResult }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onFileChange = (e) => {
    setError('');
    const f = e.target.files[0];
    if (!f) return setFile(null);
    if (!f.name.toLowerCase().endsWith('.csv')) {
      setError('Please select a .csv file');
      setFile(null);
      return;
    }
    setFile(f);
  };

  const onSubmit = async (e) => {
  e.preventDefault();
  setError('');
  if (!file) return setError('No file selected');

  const formData = new FormData();
  formData.append('file', file);

  try {
    setUploading(true);

    const resp = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/upload`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );

    const json = resp.data;

    // Save results and redirect
    setUploadResult(json);
    navigate('/results');

  } catch (err) {
    console.error(err);
    setError(err.response?.data || err.message || 'Upload failed');
  } finally {
    setUploading(false);
  }
};


  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Paper sx={{ p: 4 }} elevation={3}>
        <Typography variant="h5" gutterBottom>
          Upload CSV
        </Typography>

        <form onSubmit={onSubmit}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mt: 2 }}>
            <input id="csvFile" type="file" accept=".csv" onChange={onFileChange} style={{ display: 'inline-block' }} />

            <Button variant="contained" type="submit" disabled={uploading}>
              Upload
            </Button>

            {uploading && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CircularProgress size={20} />
                <Typography variant="body2">Processing...</Typography>
              </Box>
            )}
          </Box>

          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
        </form>

        <Box sx={{ mt: 4 }}>
          <Typography variant="body2">
            After successful upload you'll be redirected to the Results Dashboard showing totals and any failed rows.
          </Typography>
        </Box>
      </Paper>

      <Box sx={{ mt: 2 }}>
        <Link to="/results" style={{ textDecoration: 'none' }}>
          <Button variant="text">Go to Results (if already uploaded)</Button>
        </Link>
      </Box>
    </Container>
  );
}
