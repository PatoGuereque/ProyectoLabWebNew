import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { useObjectContext } from '../context/objects-context';

const ReportarObjeto = () => {
  const { postObject, clearPostResponse, postResponse } = useObjectContext();
  const [form, updateForm] = useState({});

  const readFile = (event) => {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = function () {
        updateForm({
          ...form,
          imageBase64: reader.result,
        });
      };
    }
  };

  useEffect(() => {
    return () => {
      clearPostResponse();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendForm = () => {
    postObject({
      ...form,
      dateFound: new Date(),
      status: 'active',
    });
    updateForm({});
  };

  return (
    <>
      {postResponse && (
        <Alert
          variant="filled"
          severity={postResponse.success ? 'success' : 'error'}
          style={{ margin: 20 }}
        >
          {postResponse.success ? 'El objeto ha sido reportado!' : 'Error'}
        </Alert>
      )}
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1 },
        }}
        noValidate
        autoComplete="off"
      >
        <Input
          placeholder="Campus"
          name="campus"
          value={form.campus}
          onChange={(e) => updateForm({ ...form, campus: e.target.value })}
        />
        <Input
          placeholder="Location"
          name="location"
          value={form.location}
          onChange={(e) => updateForm({ ...form, location: e.target.value })}
        />
        <Input
          placeholder="Category"
          name="category"
          value={form.category}
          onChange={(e) => updateForm({ ...form, category: e.target.value })}
        />
        <Input
          placeholder="Imagen"
          type="file"
          name="imageBase64"
          onChange={(e) => readFile(e)}
        />
        <Button size="small" onClick={() => sendForm()}>
          SUBIR
        </Button>
      </Box>
    </>
  );
};

export default ReportarObjeto;
