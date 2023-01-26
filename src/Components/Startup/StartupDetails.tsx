import { useEffect, useState } from "react";
import StartupHttpService from "../../Http/Startup/Startup.http.service";
import { useParams } from "react-router-dom";
import { Startup } from "../../Types/Startup";

const StartupDetails = () => {
  const [startup, setStartup] = useState<Startup>();
  const { id } = useParams<{ id?: string }>();
  console.log(startup);

  useEffect(() => {
    const getStartupByIdAsync = async () => {
      if (!id) return;
      try {
        console.log(id);
        const startupHttpService = new StartupHttpService();
        const response = await startupHttpService.getStartupById(id);
        console.log(response);
        setStartup(response);
      } catch (error) {
        console.log(error);
      }
    };
    getStartupByIdAsync();
  }, [id]);

  return <div>{`StartDetails: ${id}`}</div>;
};

export default StartupDetails;
