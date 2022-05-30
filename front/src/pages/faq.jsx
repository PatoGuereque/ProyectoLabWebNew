import React from 'react';
import Typography from '@mui/material/Typography';
import { Container, Box } from '@mui/material';
import FAQQuestions from '../components/FAQQuestions';

const FAQ = () => (
  <>
    <Box
      sx={{
        pt: 8,
      }}
    >
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Preguntas Frecuentes (FAQ)
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          paragraph
        >
          Aquí podrás encontrar la sección con las preguntas más frecuentes que
          nos han hecho
        </Typography>
      </Container>
    </Box>
    <FAQQuestions />

    <Box>
      <Container maxWidth="sm">
        <Typography
          component="h3"
          variant="h5"
          align="center"
          color="text.primary"
          sx={{
            pb: 2,
          }}
        >
          ¿Todavía tienes preguntas?
        </Typography>
        <Typography
          variant="body1"
          align="center"
          color="text.secondary"
          paragraph
        >
          LOCATEC de lunes a viernes de 8:00 a 18:00 horas. Teléfono: 303 2181
        </Typography>

        <Typography
          variant="body1"
          align="center"
          color="text.secondary"
          paragraph
        >
          Centro de Control de lunes a viernes 24 horas. Teléfono: 303 2148
        </Typography>
      </Container>
    </Box>
  </>
);

export default FAQ;
