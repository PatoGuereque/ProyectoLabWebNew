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
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import prisma from '../lib/prisma';

export const getServerSideProps = async ({}) => {
  const categories = (await prisma.category.findMany())
    .map((category) => category.name)
    .sort();
  const locations = (
    await prisma.location.findMany({
      include: {
        campus: true,
      },
    })
  ).reduce(
    (acc, { campus: { id: campusId, name: campusName }, name: locName }) => {
      if (!acc[campusId]) {
        acc[campusId] = {
          name: campusName,
          locations: [],
        };
      }
      acc[campusId].locations.push(locName);
      return acc;
    },
    {}
  );

  return {
    props: {
      categories,
      locations,
      campus: Object.entries(locations)
        .map(([id, { name }]) => {
          return {
            id,
            name,
          };
        })
        .sort(),
    },
  };
};

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
    .test('fileSize', 'Foto demasiado grande (Max 10mb)', (value) => {
      return value && value[0].size <= 10_485_760;
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

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 224,
    },
  },
};

const ReportarObjeto = ({ categories, locations, campus }) => {
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
  const currentCampus = watch('campus');

  useEffect(() => {
    return () => {
      clearPostResponse();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (postResponse) {
      if (postResponse.success) {
        reset();
      }
      setLoading(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postResponse]);

  const onSubmit = ({ imageBase64, ...rest }) => {
    clearPostResponse();
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
                    <FormControl fullWidth error={errors.campus !== undefined}>
                      <InputLabel id="campus-label">Campus</InputLabel>
                      <Select
                        {...field}
                        labelId="campus-label"
                        id="campus"
                        label="Campus"
                        variant="outlined"
                        MenuProps={MenuProps}
                      >
                        {campus.map(({ name, id }) => (
                          <MenuItem key={id} value={id}>
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.campus && (
                        <FormHelperText>{errors.campus.message}</FormHelperText>
                      )}
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="location"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormControl
                      fullWidth
                      error={errors.location !== undefined}
                    >
                      <InputLabel id="location-label">Ubicación</InputLabel>
                      <Select
                        {...field}
                        labelId="location-label"
                        id="location"
                        label="Ubicación"
                        fullWidth
                        variant="outlined"
                        MenuProps={MenuProps}
                        disabled={!currentCampus}
                      >
                        {currentCampus &&
                          locations[currentCampus].locations.map((loc) => (
                            <MenuItem key={loc} value={loc}>
                              {loc}
                            </MenuItem>
                          ))}
                      </Select>
                      {errors.location && (
                        <FormHelperText>
                          {errors.location.message}
                        </FormHelperText>
                      )}
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="category"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormControl
                      fullWidth
                      error={errors.category !== undefined}
                    >
                      <InputLabel id="category-label">Categoría</InputLabel>
                      <Select
                        {...field}
                        labelId="category-label"
                        id="category"
                        label="Categoría"
                        fullWidth
                        variant="outlined"
                        MenuProps={MenuProps}
                      >
                        {categories.map((cat) => (
                          <MenuItem key={cat} value={cat}>
                            {cat}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.category && (
                        <FormHelperText>
                          {errors.category.message}
                        </FormHelperText>
                      )}
                    </FormControl>
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
                      variant="outlined"
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
