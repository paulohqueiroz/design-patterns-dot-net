import React from "react";
import { Icon, Image, Card, Button} from "semantic-ui-react";
import { IActivity } from "../../models/IActivity";

interface IProps {
    activity: IActivity;
    setEditMode: (editMode: boolean) => void;
    setSelectActivity: (activity: IActivity | null ) => void;
}

const ActivityDetail : React.FC<IProps> = ({
    activity, 
    setEditMode,
    setSelectActivity
  }) => {
    return (
        <Card fluid> 
        <Image src={`/assets/Images/categoryImages/${activity.Category}.jpg`} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{activity.Title}</Card.Header>
          <Card.Meta>
            <span className='date'>{activity.Date}</span>
          </Card.Meta>
          <Card.Description>
          {activity.Description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button.Group widths={2}>
                <Button 
                onClick={() => setEditMode(true)} 
                basic 
                color="blue" 
                content="edit">
                </Button>
                <Button 
                basic 
                color="grey"
                onClick={ () =>  setSelectActivity(null) } 
                content="cancel">
                </Button>
          </Button.Group>
        </Card.Content>
      </Card>
    );
};

export default ActivityDetail;