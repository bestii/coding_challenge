import { Stack, Pagination } from "@mui/material";
import { FC, useEffect, useState, useCallback } from "react";
import StartupHttpService from "../../Http/Startup/Startup.http.service";
import { Startup } from "../../Types/Startup";
import StartupListItem from "./StartupListItem";

const StartupList: FC = () => {
  const [pages, setPages] = useState<Record<number, Startup[]> | null>(null);
  const [page, setPage] = useState<number>(1);
  const handleChange = useCallback((event: any, value: any) => {
    setPage(value);
  }, []);

  useEffect(() => {
    // Async function to get the list of startups
    const getStartupListAsync = async () => {
      try {
        const response = await StartupHttpService.getStartups();
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
    <>
      {pages ? (
        <Stack spacing={2} flexDirection="column">
          {pages[page].map((startup) => {
            return <StartupListItem key={startup.id} startup={startup} />;
          })}
          <Pagination
            count={Object.keys(pages).length}
            page={page}
            onChange={handleChange}
          />
        </Stack>
      ) : null}
    </>
  );
};

export default StartupList;
