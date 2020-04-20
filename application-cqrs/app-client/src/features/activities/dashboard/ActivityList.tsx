import React, { Fragment }  from "react";
import { Item, Label, Button, Segment } from  "semantic-ui-react";
import { IActivity } from "../../../models/IActivity";

interface IProps {
    activities: IActivity[]
}

//{ destructure }
const ActivityList : React.FC<IProps> = ({activities}) => {
    return (
        <Segment clearing>
        <Item.Group divided>
            { activities.map( (activity) => (
                <Item key={ activity.Id }>    
                    <Item.Content>
                    <Item.Header as='a'>{ activity.Title }</Item.Header>
                    <Item.Meta>{ activity.Date }</Item.Meta>
                    <Item.Description>
                        <div>{ activity.Description }</div>
                        <div>{ activity.City}, { activity.Venue}</div>
                    </Item.Description>
                    <Item.Extra>
                        <Button floated="right" content="View" color="blue"></Button>
                        <Label basic content={ activity.Category }></Label>
                    </Item.Extra>
                    </Item.Content>
                </Item>
            ))}
        </Item.Group>
        </Segment>
       
    )
}

export default ActivityList;