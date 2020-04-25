import React, { Fragment }  from "react";
import { Grid, List } from  "semantic-ui-react";
import { IActivity } from "../../../models/IActivity";
import ActivityList from "./ActivityList";
import ActivityDetail from "../../details/ActivityDetail";
import ActivityForm from "../../form/ActivityForm";

interface IProps {
    activities: IActivity[];
    selectActivity: (id: string) => void;
    selectedActivity: IActivity | null;
    editMode: boolean;
    setEditMode: (editMode: boolean) => void;
}

//{ destructure }
const ActivityDashboard: React.FC<IProps> = ({
    activities, 
    selectActivity, 
    selectedActivity,
    editMode,
    setEditMode
}) => {
    return (
        <Grid>
            <Grid.Column width={10}>
            <ActivityList activities={activities} selectActivity={selectActivity}></ActivityList>
            </Grid.Column>
            <Grid.Column width={6}>
                {selectedActivity && 
                 !editMode &&
                    <ActivityDetail activity={selectedActivity} setEditMode={setEditMode}/>
                }
                {editMode &&
                    <ActivityForm setEditMode={setEditMode} />
                }
            </Grid.Column>
        </Grid>
    );
};

export default ActivityDashboard;