import React, { SyntheticEvent, useContext } from "react";
import { Item, Label, Button, Segment } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import  ActivityStore  from "../../../app/stores/activityStore"

const ActivityList = () => {
    const activityStore = useContext(ActivityStore);
    const { activitiesByDate, selectActivity, deleteActivity, submitting, target } = activityStore;

    return (
        <Segment clearing>
            <Item.Group divided>
                {activitiesByDate.map((activity) => (
                    <Item key={activity.Id}>
                        <Item.Content>
                            <Item.Header as='a'>{activity.Title}</Item.Header>
                            <Item.Meta>{activity.Date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.Description}</div>
                                <div>{activity.City}, {activity.Venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => selectActivity(activity.Id)}
                                    floated="right"
                                    content="View" 
                                    color="blue">
                                </Button>
                                <Button onClick={(e) => deleteActivity(e, activity.Id)}
                                    name={activity.Id}
                                    loading={target === activity.Id && submitting}
                                    floated="right"
                                    content="Delete" 
                                    color="red">
                                </Button>
                                <Label basic content={activity.Category}></Label>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>

    )
}

export default observer(ActivityList);