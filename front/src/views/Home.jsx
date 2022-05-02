import React from 'react';

function Home() {
     return (
        <div
            style={{
                width: "100%",
                height: "500px",
                background: `url('${process.env.PUBLIC_URL}/boxes.jpg')`,
                backgroundPosition: 'center',
            }}
            >
            <center>
                <img src={process.env.PUBLIC_URL+"logolocatec.png"} alt = "Logo Locatec" />
            </center>
        </div>
     );
 }

export default Home;
