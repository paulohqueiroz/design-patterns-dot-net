import React, { Fragment }  from "react";
import { Grid, List } from  "semantic-ui-react";
import { IActivity } from "../../../models/IActivity";

interface IProps {
    activities: IActivity[]
}

//{ destructure }
const ActivityDashboard: React.FC<IProps> = ({activities}) => {
    return (
        <Grid>
            <Grid.Column width={10}>
            <List>
                {activities.map((item) => (
                    <List.Item key={item.Id}> {item.Title}</List.Item>
                ))}
            </List>
            </Grid.Column>
        </Grid>
    );
};

export default ActivityDashboard;