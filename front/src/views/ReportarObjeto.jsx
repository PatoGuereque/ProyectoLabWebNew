import React, { useState, useRef, useEffect } from 'react';
import Button from '@mui/material/Button';
import { useObjectContext } from '../context/objects-context';
import Alert from '@mui/material/Alert';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

const ReportarObjeto = () => {
  const { postObject, clearPostResponse, postResponse } = useObjectContext();
  const [showErrorAlert, editErrorAlert] = useState(false);
  const [form, updateForm] = useState({});
  const hiddenFileInput = useRef(null);
  const [fileName, setFileName] = useState('');
  const [errorLabel, setErrorLabel] = useState('Error');

  const readFile = (event) => {
    console.log(event.target);
    if (event.target.files && event.target.files[0]) {
      setFileName(event.target.files[0].name);
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
    //Error Handling
    if (
      !form.campus ||
      !form.location ||
      !form.category ||
      !form.imageBase64 ||
      form.campus.trim() === '' ||
      form.location.trim() === '' ||
      form.category.trim() === '' ||
      form.imageBase64.trim() === ''
    ) {
      setErrorLabel('Debes de llenar todos los campos.');
      editErrorAlert(true);
      const timer = setTimeout(() => {
        editErrorAlert(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
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
      {showErrorAlert && (
        <Alert variant="filled" severity="error" style={{ margin: 20 }}>
          {errorLabel}
        </Alert>
      )}
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Reportar
          </Typography>
          <React.Fragment>
            <Typography variant="h6" gutterBottom>
              Detalles
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  id="campus"
                  label="Campus"
                  fullWidth
                  name="campus"
                  variant="standard"
                  value={form.campus}
                  onChange={(e) =>
                    updateForm({ ...form, campus: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="location"
                  label="Ubicación"
                  fullWidth
                  name="location"
                  variant="standard"
                  value={form.location}
                  onChange={(e) =>
                    updateForm({ ...form, location: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="category"
                  name="category"
                  label="Categoría"
                  fullWidth
                  variant="standard"
                  value={form.category}
                  onChange={(e) =>
                    updateForm({ ...form, category: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} style={{ textAlign: 'left' }}>
                <input
                  placeholder="Imagen"
                  type="file"
                  name="imageBase64"
                  ref={hiddenFileInput}
                  onChange={(e) => readFile(e)}
                  style={{ display: 'none' }}
                />
                <p>{fileName}</p>
                <Button
                  variant="outlined"
                  onClick={() => hiddenFileInput.current.click()}
                >
                  SUBIR IMAGEN
                </Button>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="comments"
                  name="comments"
                  label="Comentarios"
                  fullWidth
                  multiline
                  rows={4}
                  variant="standard"
                  value={form.comments}
                  onChange={(e) =>
                    updateForm({ ...form, comments: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => sendForm()}
                >
                  REPORTAR
                </Button>
              </Grid>
            </Grid>
          </React.Fragment>
        </Paper>
      </Container>
    </>
  );
};

export default ReportarObjeto;
