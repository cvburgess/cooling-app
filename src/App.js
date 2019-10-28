import React from "react";
import useAxios from "axios-hooks";
import { usePosition } from "use-position"; // https://github.com/trekhleb/use-position
import { Grid } from "@material-ui/core";

import Navigation from "./Navigation";
import Shelter from "./Shelter";

const App = () => {
  const { latitude, longitude } = usePosition();
  const type = 1; // Filter down to only cooling shelters
  const [{ data }, refetch] = useAxios(`/.netlify/functions/getShelters?lat=${latitude}&lon=${longitude}&type=${type}`);
  const shelters = (data && data.shelters) || [];

  return (
    <div>
      <Navigation reloadShelters={refetch} />

      <Grid container spacing={1}>
        {shelters.map(shelter => (
          <Shelter
            name={shelter.name}
            address={shelter.address}
            phone={shelter.phone}
            key={shelter.id}
          />
        ))}

      </Grid>
    </div>
  );
};

export default App;
