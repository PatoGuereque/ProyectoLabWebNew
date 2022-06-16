import React, { useState, useEffect } from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { useObjectContext } from '../context/objects-context';
import { useCategoryContext } from '../context/categories-context';
import { usePlaceContext } from '../context/places-context';

const Filter = ({ results, setResults }) => {
  //const { objects, deactivateObject } = useObjectContext();
  // const [results, setResults] = useState([]);
  const { categories } = useCategoryContext();
  const { places } = usePlaceContext();

  const [categoriesFiltered, setCategoriesFiltered] = useState(categoriesList);

  useEffect(() => {
    console.log(categories);
    console.log(places);

    let categoriesFormatted =
      categories &&
      categories.map((category) => {
        return {
          title: category.name,
          type: 'objeto',
        };
      });

    let placesFormatted =
      places &&
      places.map((place) => {
        return {
          title: place.name,
          type: 'ubicacion',
        };
      });

    console.log(categoriesFormatted);
    console.log(placesFormatted);

    let mergedList =
      placesFormatted &&
      categoriesFormatted &&
      categoriesFormatted.concat(placesFormatted);
    categoriesList = mergedList;
    setCategoriesFiltered(categoriesList);
  }, [categories, places]);

  return (
    <Stack spacing={3} sx={{ width: 300 }}>
      <Autocomplete
        multiple
        id="tags-standard"
        options={categoriesFiltered}
        getOptionLabel={(option) => {
          if (option) {
            return option?.title;
          }
          // option ?.title
        }}
        onChange={(event, value) => {
          //console.log(value)
          setResults(value);

          let categoriesLeft = [];
          categoriesList.forEach((category) => {
            let cont = 0;
            value.forEach((element) => {
              if (element?.type == category?.type) {
                cont++;
              }
            });
            if (cont == 0) {
              categoriesLeft.push(category);
            }
          });
          setCategoriesFiltered(categoriesLeft);
        }}
        defaultValue={[]}
        renderInput={(params) => (
          <TextField {...params} label="Search..." placeholder="Keywords" />
        )}
      />
    </Stack>
  );
};

const categoriesList = [];
/* { title: 'Aulas 1', type: 'ubicacion' },
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
];*/

export default Filter;
