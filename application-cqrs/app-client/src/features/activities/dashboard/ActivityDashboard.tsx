import React, { Fragment }  from "react";
import { Grid, List } from  "semantic-ui-react";
import { IActivity } from "../../../models/IActivity";
import ActivityList from "./ActivityList";
import ActivityDetail from "../../details/ActivityDetail";
import ActivityForm from "../../form/ActivityForm";

interface IProps {
    activities: IActivity[]
}

//{ destructure }
const ActivityDashboard: React.FC<IProps> = ({activities}) => {
    return (
        <Grid>
            <Grid.Column width={10}>
            <ActivityList activities={activities}></ActivityList>
            </Grid.Column>
            <Grid.Column width={6}>
                <ActivityDetail/>
                <ActivityForm />
            </Grid.Column>
        </Grid>
    );
};

export default ActivityDashboard;