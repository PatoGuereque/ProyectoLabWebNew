import React, { useState, useEffect } from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

const Filter = () => {
  return (
    <Stack spacing={3} sx={{ width: 500 }}>
      <Autocomplete
        multiple
        id="tags-standard"
        options={categories}
        getOptionLabel={(option) => option.title}
        defaultValue={[]}
        renderInput={(params) => (
          <TextField {...params} label="Search..." placeholder="Keywords" />
        )}
      />
    </Stack>
  );
};

const categories = [
  { title: 'Aulas 1', type: 'ubicacion' },
  { title: 'Aulas 2', type: 'ubicacion' },
  { title: 'Aulas 3', type: 'ubicacion' },
  { title: 'Aulas 4', type: 'ubicacion' },
  { title: 'Aulas 6', type: 'ubicacion' },
  { title: 'Aulas 7', type: 'ubicacion' },
  { title: 'Biblio', type: 'ubicacion' },
  { title: 'Centrales', type: 'ubicacion' },
  { title: 'Jubileo', type: 'ubicacion' },
  { title: 'Rectoría', type: 'ubicacion' },
  { title: 'Audífonos', type: 'objeto' },
  { title: 'Cartera', type: 'objeto' },
  { title: 'Computadora', type: 'objeto' },
  { title: 'Llaves', type: 'objeto' },
  { title: 'Mochila', type: 'objeto' },
  { title: 'Teléfono', type: 'objeto' },
  { title: 'Termo', type: 'objeto' },
];

export default Filter;
