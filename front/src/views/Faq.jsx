import React from 'react';

function Faq() {
    return (
      <div className="Faq" 
         style={{
             margin: '20px'
         }}
      >
        <center><h2 id="heading-faq"><span id="faq"></span>FAQ</h2></center>

        <h3 id="Faq1"><span id="FAQ1"></span>¿Cómo reportar un objeto?</h3>
        <p>En la pestaña de objetos, se te pedira que llenes un formulario en el cual llenaras información básica de caracteristicas del objeto, donde fue encontrado, etc.</p>
        <p>Se te pide que al llenar el formulario entregues el objeto a locatec.</p>
        
        <h3 id="Faq2"><span id="FAQ2"></span>¿Dónde o cómo puedo recuperar un objeto?</h3>
        <p>Todos los objetos en la pestaña de Objetos Encontrados, fueron entregados a Locatec (Ubicado en aulas I, primer piso).</p>

        <h3 id="Faq3"><span id="FAQ3"></span>¿Qué pasa si no encuentro mi Objeto en OBJETOS PERDIDOS?</h3>
        <p>No todos los objetos que se encuentran en locatec estan en la pagina por lo que te recomendamos darte una vuelta a locatec (Ubicado en aulas I, primer piso).</p>

      </div>
    );
  }

export default Faq;
