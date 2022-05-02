import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import Home from './views/Home';
import Layout from './components/Layout';
import Faq from './views/Faq';
import ObjetosEncontrados from './views/ObjetosEncontrados';
import ReportarObjeto from './views/ReportarObjeto';
import { AuthContextProvider } from './context/auth-context';
import { ObjectContextProvider } from './context/objects-context';

const darkTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

const App = () => (
  <>
    <AuthContextProvider>
      <ObjectContextProvider>
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
      </ObjectContextProvider>
    </AuthContextProvider>
  </>
);

export default App;
