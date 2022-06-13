import React from 'react';
import { Pagination } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: 0,
    zIndex: 200,
    padding: '10px 80px',

    color: 'black',
    width: '100%',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const AppPagination = ({ setPage, pageNumber }) => {
  const classes = useStyles();

  const handleChange = (page) => {
    setPage(page);
    window.scroll(0, 0);
  };

  return (
    <div className={classes.container}>
      <div className={classes.root}>
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
