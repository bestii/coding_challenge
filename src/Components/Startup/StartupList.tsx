import { Box, Grid } from "@mui/material";
import { FC, useEffect, useState } from "react";
import StartupHttpService from "../../Http/Startup/Startup.http.service";
import { Startup } from "../../Types/Startup";
import StartupListItem from "./StartupListItem";

const StartupList: FC = () => {
  const [startups, setStartups] = useState<Startup[]>([]);

  useEffect(() => {
    const getStartupListAsync = async () => {
      try {
        const startupHttpService = new StartupHttpService();
        const response = await startupHttpService.getStartups();
        console.log(response);
        setStartups(response);
      } catch (error) {
        console.log(error);
      }
    };
    getStartupListAsync();
  }, []);

  return (
    <Grid container spacing={2}>
      {startups.map((startup) => {
        return <StartupListItem key={startup.id} startup={startup} />;
      })}
    </Grid>
  );
};

export default StartupList;
