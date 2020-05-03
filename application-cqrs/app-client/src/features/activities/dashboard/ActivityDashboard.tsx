import React, { SyntheticEvent, useContext } from "react";
import { Grid } from "semantic-ui-react";
import { IActivity } from "../../../models/IActivity";
import ActivityList from "./ActivityList";
import ActivityDetail from "../../details/ActivityDetail";
import ActivityForm from "../../form/ActivityForm";
import { observer } from "mobx-react-lite";
import  ActivityStore  from "../../../app/stores/activityStore"

interface IProps {
    activities: IActivity[];
    setEditMode: (editMode: boolean) => void;
    setSelectActivity: (activity: IActivity | null) => void;
    editActivity: (activity: IActivity) => void;
    deleteActivity: (event: SyntheticEvent<HTMLButtonElement>, id: string) => void;
    submitting: boolean;
    target: string;
}

//{ destructure }
const ActivityDashboard: React.FC<IProps> = ({
    setEditMode,
    setSelectActivity,
    editActivity,
    deleteActivity,
    submitting,
    target
}) => {

    const activityStore = useContext(ActivityStore);
    const { editMode, selectedActivity } = activityStore;

    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList
                    deleteActivity={deleteActivity}
                    submitting={submitting}
                    target={target}
                ></ActivityList>
            </Grid.Column>
            <Grid.Column width={6}>
                {selectedActivity &&
                    !editMode &&
                    <ActivityDetail
                        setSelectActivity={setSelectActivity}
                        setEditMode={setEditMode}
                    />
                }
                {editMode &&
                    <ActivityForm
                        key={selectedActivity?.Id}
                        setEditMode={setEditMode}
                        activity={selectedActivity!}
                        editActivity={editActivity}
                        submitting={submitting}
                    />
                }
            </Grid.Column>
        </Grid>
    );
};

export default observer(ActivityDashboard);