import { Grid, Stack, Pagination } from "@mui/material";
import { FC, useEffect, useState, useCallback } from "react";
import StartupHttpService from "../../Http/Startup/Startup.http.service";
import { Startup } from "../../Types/Startup";
import StartupListItem from "./StartupListItem";

const StartupList: FC = () => {
  const [startups, setStartups] = useState<Startup[]>([]);
  const [pages, setPages] = useState({});
  const [page, setPage] = useState(1);
  const handleChange = (event: any, value: any) => {
    setPage(value);
    console.log(value);
  };
  console.log(pages);

  useEffect(() => {
    // Async Function to get the list of startups
    const getStartupListAsync = async () => {
      try {
        const response = await StartupHttpService.getStartups();
        //console.log(response);
        setStartups(response);
        let counter = 0,
          page = 1,
          pagesTemp: Record<any, any> = {};
        while (counter < response.length) {
          const p = response.slice(counter, counter + 2);
          pagesTemp[page] = p;
          counter += 2;
          ++page;
        }
        setPages(pagesTemp);
      } catch (error) {
        console.log(error);
      }
    };
    getStartupListAsync();
  }, []);

  return (
    <Grid container spacing={2}>
      <Stack spacing={2}>
        {startups.map((startup) => {
          return <StartupListItem key={startup.id} startup={startup} />;
        })}
        <Pagination count={10} page={page} onChange={handleChange} />
      </Stack>
    </Grid>
  );
};

export default StartupList;
