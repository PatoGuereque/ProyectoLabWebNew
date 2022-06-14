import React from 'react';
import NextLink from 'next/link';

export default function Custom404() {
  return (
    <div>
      <div className="err">404</div>
      <div className="msg">
        ¡Oops! Parece que esta página también se perdió...
        <br />
        <p>
          <NextLink href="/">
            <div>
              <a className="backBtn">Regresemos</a>
              {' '}a buscarla, seguro alguien ya levantó reporte.
            </div>
          </NextLink>
        </p>
      </div>
    </div>
  );
}
