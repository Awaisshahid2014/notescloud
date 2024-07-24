import React, { useContext, useEffect } from "react";
import noteContext from "../contexts/notes/noteContext";

const About = () => {
  const contextData = useContext(noteContext);
  return (
    <div className={`${contextData.theme.color} vh-100 w-100`}>
      this is about{" "}
    </div>
  );
};

export default About;
