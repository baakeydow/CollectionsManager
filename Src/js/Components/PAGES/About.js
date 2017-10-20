import React from "react";
const About = ({ wording }) => {

    return (
    <div className="container">
      <div className="Content title">
        <h3>{wording.title}</h3>
      </div>
     </div>
    );
}

export default About;
