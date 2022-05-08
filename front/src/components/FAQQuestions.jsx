import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Container } from '@mui/material';

const questions = [
  {
    key: 'key1',
    question: '¿Cómo reportar un objeto?',
    answer: (
      <>
        En la pestaña de objetos, se te pedirá que llenes un formulario en el
        cual llenarás información básica de caracteristicas del objeto, donde
        fue encontrado, etc. Se te pide que al llenar el formulario entregues el
        objeto a locatec.
      </>
    ),
  },
  {
    key: 'key2',
    question: '¿Dónde o cómo puedo recuperar un objeto?',
    answer: (
      <>
        Todos los objetos en la pestaña de Objetos Encontrados fueron entregados
        a Locatec (Ubicado en aulas I, primer piso).
      </>
    ),
  },
  {
    key: 'key3',
    question: '¿Qué pasa si no encuentro mi Objeto en OBJETOS PERDIDOS?',
    answer: (
      <>
        No todos los objetos que se encuentran en locatec estan en la pagina por
        lo que te recomendamos darte una vuelta a locatec (Ubicado en aulas I,
        primer piso).
      </>
    ),
  },
];

const FAQQuestions = () => {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (_event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Container sx={{ py: 8 }} maxWidth="md">
      {questions.map((question) => (
        <Accordion
          expanded={expanded === question.key}
          onChange={handleChange(question.key)}
          key={question.key}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{question.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{question.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
};

export default FAQQuestions;
