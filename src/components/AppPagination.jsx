import React from 'react';
import { Pagination } from '@mui/material';

const AppPagination = ({ setPage, pageNumber }) => {
  const handleChange = (page) => {
    setPage(page);
    window.scroll(0, 0);
  };

  return (
    <div
      sx={{
        position: 'fixed',
        bottom: 0,
        zIndex: 200,
        padding: '10px 80px',
        color: 'black',
        width: '100%',
      }}
    >
      <div
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Pagination
          onChange={(e) => handleChange(e.target.textContent)}
          color="primary"
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
          variant="outlined"
          count={pageNumber}
        />
      </div>
    </div>
  );
};

export default AppPagination;
