import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import Home from './views/Home';
import Layout from './components/Layout';
import Faq from './views/Faq';
import ObjetosEncontrados from './views/ObjetosEncontrados';
import ReportarObjeto from './views/ReportarObjeto';

const darkTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

const App = () => (
  <>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/objetos" element={<ObjetosEncontrados />} />
          <Route path="/reportar" element={<ReportarObjeto />} />
        </Route>
      </Routes>
    </ThemeProvider>
  </>
);

export default App;
