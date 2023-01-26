import { Card, CardContent, Grid, Typography } from "@mui/material";
import { FC } from "react";
import { Link } from "react-router-dom";
import { Startup } from "../../Types/Startup";

type StartupListItemProps = {
  startup: Startup;
};

const StartupListItem: FC<StartupListItemProps> = ({ startup }) => {
  const {
    id,
    name,
    shortDescription,
    dateFounded,
    employees,
    totalFunding,
    currentInvestmentStage,
  } = startup;
  return (
    <Grid item xs={12}>
      <Link to={`/startups/${id}`}>
        <Card>
          <CardContent>
            <Typography variant="h5">{name}</Typography>
            <Typography
              variant="caption"
              sx={{ color: "#6c757d" }}
            >{`Founded: ${new Date(
              dateFounded
            ).getFullYear()} | ${employees} Employees | ${totalFunding} $ | ${currentInvestmentStage}`}</Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              {shortDescription}
            </Typography>
          </CardContent>
        </Card>
      </Link>
    </Grid>
  );
};

export default StartupListItem;
