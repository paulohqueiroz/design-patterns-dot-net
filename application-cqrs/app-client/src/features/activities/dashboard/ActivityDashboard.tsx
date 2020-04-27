import React from "react";
import { Grid } from "semantic-ui-react";
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
    setSelectActivity: (activity: IActivity | null) => void;
    createActivity: (activity: IActivity) => void;
    editActivity: (activity: IActivity) => void;
    deleteActivity: (id: string) => void;
}

//{ destructure }
const ActivityDashboard: React.FC<IProps> = ({
    activities,
    selectActivity,
    selectedActivity,
    editMode,
    setEditMode,
    setSelectActivity,
    createActivity,
    editActivity,
    deleteActivity
}) => {
    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList
                    activities={activities}
                    selectActivity={selectActivity}
                    deleteActivity={deleteActivity}
                ></ActivityList>
            </Grid.Column>
            <Grid.Column width={6}>
                {selectedActivity &&
                    !editMode &&
                    <ActivityDetail
                        activity={selectedActivity}
                        setSelectActivity={setSelectActivity}
                        setEditMode={setEditMode}
                    />
                }
                {editMode &&
                    <ActivityForm
                        key={selectedActivity?.Id}
                        setEditMode={setEditMode}
                        activity={selectedActivity!}
                        createActivity={createActivity}
                        editActivity={editActivity}
                    />
                }
            </Grid.Column>
        </Grid>
    );
};

export default ActivityDashboard;