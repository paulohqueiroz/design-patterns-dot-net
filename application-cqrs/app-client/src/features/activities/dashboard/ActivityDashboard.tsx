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
    deleteActivity: (event: SyntheticEvent<HTMLButtonElement>, id: string) => void;
    submitting: boolean;
    target: string;
}

//{ destructure }
const ActivityDashboard: React.FC<IProps> = ({
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
                    <ActivityDetail />
                }
                {editMode &&
                    <ActivityForm
                        key={selectedActivity?.Id}
                        activity={selectedActivity!}
                        submitting={submitting}
                    />
                }
            </Grid.Column>
        </Grid>
    );
};

export default observer(ActivityDashboard);