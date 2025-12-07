
import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import { FailedRecords } from './FailedRecords';

export function ResultsDashboard({ uploadResult }) {
  if (!uploadResult) {
    return (
      <Container maxWidth="md" sx={{ mt: 6 }}>
        <Paper sx={{ p: 4 }} elevation={3}>
          <Typography variant="h6">No results yet</Typography>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Please upload a CSV first on the Upload page.
          </Typography>
        </Paper>
      </Container>
    );
  }

  const { totalRows, successCount, failedCount, failedRecords } = uploadResult;

  return (
    <Container maxWidth="lg" sx={{ mt: 6 }}>
      <Paper sx={{ p: 4, mb: 4 }} elevation={3}>
        <Typography variant="h5" gutterBottom>
          Results Dashboard
        </Typography>

        <Box sx={{ display: 'flex', gap: 4, mt: 2 }}>
          <Box>
            <Typography variant="subtitle2">Total Records</Typography>
            <Typography variant="h6">{totalRows ?? 0}</Typography>
          </Box>

          <Box>
            <Typography variant="subtitle2">Valid (Success) Records</Typography>
            <Typography variant="h6">{successCount ?? 0}</Typography>
          </Box>

          <Box>
            <Typography variant="subtitle2">Invalid (Failed) Records</Typography>
            <Typography variant="h6">{failedCount ?? 0}</Typography>
          </Box>
        </Box>
      </Paper>

      <Paper sx={{ p: 2 }} elevation={2}>
        <FailedRecords failedRecords={failedRecords || []} />
      </Paper>
    </Container>
  );
}
