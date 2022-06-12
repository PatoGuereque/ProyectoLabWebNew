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

const AppPagination = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.root}>
        <Pagination
          color="primary"
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
          variant="outlined"
          count={10}
        />
      </div>
    </div>
  );
};

export default AppPagination;
