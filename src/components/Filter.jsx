import React from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Typography,
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';

const Filter = ({ title, options, checked, setChecked, sx }) => {
  return (
    <Accordion sx={sx} defaultExpanded>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <FormControl
          component="fieldset"
          variant="standard"
          sx={{
            maxHeight: 200,
            width: '100%',
            overflow: 'auto',
          }}
        >
          <FormGroup
            sx={{
              flexWrap: 'nowrap',
            }}
          >
            {options
              ?.sort(({ name: name1 }, { name: name2 }) =>
                name1.localeCompare(name2)
              )
              .map(({ name }) => (
                <FormControlLabel
                  key={name}
                  control={
                    <Checkbox
                      checked={checked[name] === true}
                      onChange={() => {
                        const newState = { ...checked };
                        newState[name] = checked[name] !== true;
                        if (newState[name] !== true) {
                          delete newState[name];
                        }
                        setChecked(newState);
                      }}
                      name={name}
                    />
                  }
                  label={name}
                />
              ))}
          </FormGroup>
        </FormControl>
      </AccordionDetails>
    </Accordion>
  );
};

export default Filter;
