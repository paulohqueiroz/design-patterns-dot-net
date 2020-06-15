import React, { useContext } from "react";
import { Image, Card, Button } from "semantic-ui-react";
import ActivityStore from "../../app/stores/activityStore"
import { observer } from "mobx-react-lite";

const ActivityDetail = () => {

  const activityStore = useContext(ActivityStore);
  const { activity: activity, openEditForm, cancelSelectedActivity } = activityStore;

  return (
    <Card fluid>
      <Image src={`/assets/Images/categoryImages/${activity!.Category}.jpg`} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{activity!.Title}</Card.Header>
        <Card.Meta>
          <span className='date'>{activity!.Date}</span>
        </Card.Meta>
        <Card.Description>
          {activity!.Description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            onClick={() => openEditForm(activity!.Id)}
            basic
            color="blue"
            content="edit">
          </Button>
          <Button
            basic
            color="grey"
            onClick={() => cancelSelectedActivity}
            content="cancel">
          </Button>
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(ActivityDetail);