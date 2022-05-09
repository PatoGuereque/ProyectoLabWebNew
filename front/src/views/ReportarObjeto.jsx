import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import { useObjectContext } from '../context/objects-context';
import Alert from '@mui/material/Alert';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useForm, Controller } from 'react-hook-form';
import { object, string, mixed, setLocale } from 'yup';
import { useState } from 'react';
import { LoadingButton } from '@mui/lab';

setLocale({
  mixed: {
    default: 'No es válido',
    // eslint-disable-next-line no-template-curly-in-string
    required: '${path} es un campo requerido',
  },
});

const userSchema = object({
  imageBase64: mixed()
    .required()
    .test('fileSize', 'Debes de subir una foto', (value) => {
      return value && value[0].size <= 1_000_000;
    }),
  campus: string().required(),
  category: string().required(),
  location: string().required(),
  comments: string().required(),
});

const schemaResolver = (data) => {
  try {
    const values = userSchema.validateSync(data, {
      abortEarly: false,
    });
    return {
      values,
      errors: {},
    };
  } catch (errors) {
    return {
      values: {},
      errors: errors.inner.reduce(
        (allErrors, currentError) => ({
          ...allErrors,
          [currentError.path]: {
            type: currentError.type ?? 'validation',
            message: currentError.message,
          },
        }),
        {}
      ),
    };
  }
};

const ReportarObjeto = () => {
  const { postObject, clearPostResponse, postResponse } = useObjectContext();
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    watch,
    reset,
  } = useForm({
    defaultValues: {
      campus: '',
      location: '',
      category: '',
      imageBase64: '',
      comments: '',
    },
    resolver: schemaResolver,
  });

  const imageBase64 = watch('imageBase64');

  useEffect(() => {
    if (postResponse?.success && imageBase64?.length !== 0) {
      setLoading(false);
      reset();
      return;
    }

    return () => {
      if (postResponse !== undefined) {
        clearPostResponse();
      }
    };
  }, [clearPostResponse, postResponse, reset, imageBase64]);

  const onSubmit = ({ imageBase64, ...rest }) => {
    const reader = new FileReader();
    setLoading(true);
    reader.onload = () => {
      postObject({
        ...rest,
        imageBase64: reader.result,
        dateFound: new Date(),
        status: 'active',
      });
    };
    reader.readAsDataURL(imageBase64[0]);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {postResponse && (
        <Alert
          variant="filled"
          severity={postResponse.success ? 'success' : 'error'}
          style={{ margin: 20 }}
        >
          {postResponse.success ? 'El objeto ha sido reportado!' : 'Error'}
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
                <Controller
                  name="campus"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="campus"
                      label="Campus"
                      fullWidth
                      variant="standard"
                      error={errors.campus !== undefined}
                      helperText={errors.campus?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="location"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="location"
                      label="Ubicación"
                      fullWidth
                      variant="standard"
                      error={errors.location !== undefined}
                      helperText={errors.location?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="category"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="category"
                      label="Categoría"
                      fullWidth
                      variant="standard"
                      error={errors.category !== undefined}
                      helperText={errors.category?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} style={{ textAlign: 'left' }}>
                <p>{imageBase64 && imageBase64[0]?.name}</p>
                <Button
                  variant="outlined"
                  component="label"
                  color={errors.imageBase64 !== undefined ? 'error' : 'primary'}
                >
                  SUBIR IMAGEN
                  <input
                    {...register('imageBase64')}
                    placeholder="Imagen"
                    type="file"
                    name="imageBase64"
                    accept="image/*"
                    hidden
                  />
                </Button>
                {errors.imageBase64 && (
                  <Typography component="p" variant="caption" color="error">
                    {errors.imageBase64.message}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="comments"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="comments"
                      name="comments"
                      label="Comentarios"
                      fullWidth
                      multiline
                      rows={4}
                      variant="standard"
                      error={errors.comments !== undefined}
                      helperText={errors.comments?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <LoadingButton
                  loading={loading}
                  variant="contained"
                  color="success"
                  type="submit"
                >
                  REPORTAR
                </LoadingButton>
              </Grid>
            </Grid>
          </React.Fragment>
        </Paper>
      </Container>
    </form>
  );
};

export default ReportarObjeto;
