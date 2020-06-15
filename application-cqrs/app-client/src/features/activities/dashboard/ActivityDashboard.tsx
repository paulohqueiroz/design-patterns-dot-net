import React, { SyntheticEvent, useContext } from "react";
import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import ActivityDetail from "../../details/ActivityDetail";
import ActivityForm from "../../form/ActivityForm";
import { observer } from "mobx-react-lite";
import  ActivityStore  from "../../../app/stores/activityStore"

const ActivityDashboard = () => {

    const activityStore = useContext(ActivityStore);
    const { editMode, activity, submitting } = activityStore;

    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList/>
            </Grid.Column>
            <Grid.Column width={6}>
                {activity &&
                    !editMode &&
                    <ActivityDetail />
                }
                {editMode &&
                    <ActivityForm
                        key={activity?.Id}
                        activity={activity!}
                        submitting={submitting}
                    />
                }
            </Grid.Column>
        </Grid>
    );
};

export default observer(ActivityDashboard);