import React from 'react';
import { Box, Button, Container, Grid, Link, Typography } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import { Link as RouterLink } from 'react-router-dom';
import FAQQuestions from '../components/FAQQuestions';
import Copyright from '../components/Copyright';
import FoundItemIcon from '../icons/FoundItemsIcon';
import LostItemsIcon from '../icons/LostItemsIcon';
import { useAuthContext } from '../context/auth-context';

const images = ['book', 'card', 'key', 'mobile', 'name', 'screen'];

const Home = () => {
  const { user, login } = useAuthContext();

  return (
    <>
      <Container maxWidth="lg">
        <Grid
          container
          sx={{
            alignItems: 'center',
            minHeight: 'calc(100vh - 68.5px)',
          }}
        >
          <Grid
            item
            md={5}
            xs={12}
            sx={{
              display: { xs: 'block', md: 'block' },
              textAlign: {
                xs: 'center',
                md: 'left',
              },
            }}
          >
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontFamily: 'Barlow',
                fontWeight: 'bold',
                pb: 6,
              }}
            >
              Reporta Objetos Encontrados y Objetos Perdidos
            </Typography>

            <Typography variant="body">
              Es un servicio que presta la Dirección de Seguridad y su objetivo
              es la recepción y devolución de artículos extraviados y olvidados
              dentro del campus y sus alrededores.
            </Typography>

            <Box
              sx={{
                mt: 6,
              }}
            >
              {user === undefined ? (
                <Button variant="contained" onClick={login}>
                  Iniciar Sesión
                </Button>
              ) : (
                <Button
                  variant="contained"
                  component={RouterLink}
                  to="/reportar"
                >
                  Reportar Objeto
                </Button>
              )}
            </Box>
          </Grid>

          <Grid
            item
            md={7}
            sx={{
              display: { xs: 'none', md: 'block' },
            }}
          >
            <Carousel height="500px">
              {images.map((image) => (
                <Container
                  key={image}
                  sx={{
                    alignContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                    width: '100%',
                    height: '500px',
                  }}
                >
                  <img
                    src={`/icons/${image}.svg`}
                    height="500px"
                    width="100%"
                    alt="img"
                  />
                </Container>
              ))}
            </Carousel>
          </Grid>
        </Grid>
        <Grid container>
          <Grid
            item
            xs={12}
            sx={{
              minHeight: '50vh',
            }}
          >
            <Typography
              variant="h4"
              component="h2"
              sx={{
                fontFamily: 'Barlow',
                fontWeight: 'bold',
                textAlign: 'center',
                pb: 10,
              }}
            >
              Ayudando a reunir objetos con sus dueños
            </Typography>

            <Grid
              container
              sx={{
                textAlign: 'center',
              }}
            >
              <Grid item md={6} xs={12}>
                <LostItemsIcon sx={{ fontSize: 120 }} color="primary" />
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{
                    fontFamily: 'Barlow',
                    fontWeight: 'bold',
                    pb: 2,
                  }}
                >
                  Objetos Perdidos
                </Typography>

                <Typography
                  variant="body1"
                  align="center"
                  color="text.secondary"
                  paragraph
                >
                  Puedes reportar un objeto que perdiste y aparecerá en el
                  catálogo de objetos perdidos
                </Typography>
              </Grid>
              <Grid item md={6} xs={12}>
                <FoundItemIcon sx={{ fontSize: 120 }} color="primary" />
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{
                    fontFamily: 'Barlow',
                    fontWeight: 'bold',
                    pb: 2,
                  }}
                >
                  Objetos Encontrados
                </Typography>
                <Typography
                  variant="body1"
                  align="center"
                  color="text.secondary"
                  paragraph
                >
                  Si encontraste un objeto lo puedes reportar como encontrado .
                  Por seguridad, no se pueden consultar objetos encontrados.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              minHeight: '50vh',
            }}
          >
            <Typography
              variant="h4"
              component="h2"
              sx={{
                fontFamily: 'Barlow',
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              Preguntas frecuentes
            </Typography>
            <FAQQuestions />
            <Typography
              variant="body1"
              align="center"
              color="text.secondary"
              paragraph
            >
              Más información en{' '}
              <Link component={RouterLink} to="/faq">
                FAQ
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>

      <Container
        component="footer"
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          mt: 8,
          pb: 6,
        }}
      >
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </>
  );
};

export default Home;
