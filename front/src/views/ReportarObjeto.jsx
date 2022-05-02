import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import { postObjects } from '../reducers/found-objects-reducer';
import { useAuthContext } from '../context/auth-context';
import Alert from '@mui/material/Alert';

const ReportarObjeto = () => {
  const { user } = useAuthContext();
  const [showAlert, editAlert] = useState(false);
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

  const sendForm = () => {
    postObjects({
      ...form,
      reportingUser: user.email,
      dateFound: new Date(),
      status: 'active',
    });
    updateForm({});
    editAlert(true);
  };

  return (
    <>
      {showAlert ? (
        <Alert variant="filled" severity="success" style={{ margin: 20 }}>
          El objeto ha sido reportado!
        </Alert>
      ) : null}
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
