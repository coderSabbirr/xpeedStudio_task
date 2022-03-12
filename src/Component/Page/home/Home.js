import React, { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    fetch(`http://localhost/api/list.php`)
      .then((response) => response.json())
      .then((data) =>
        data.data.headers.map((culmans) => {
          console.log(culmans);
        })
      );
  }, []);

  return <main></main>;
};

export default Home;
