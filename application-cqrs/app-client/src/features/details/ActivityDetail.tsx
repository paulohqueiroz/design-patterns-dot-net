import React from "react";
import { Icon, Image, Card, Button} from "semantic-ui-react";
import { IActivity } from "../../models/IActivity";

interface IProps {
    selectedActivity: IActivity;
    setEditMode: (editMode: boolean) => void;
}

const ActivityDetail : React.FC<IProps> = ({selectedActivity, setEditMode}) => {
    return (
        <Card fluid> 
        <Image src={`/assets/Images/categoryImages/${selectedActivity.Category}.jpg`} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{selectedActivity.Title}</Card.Header>
          <Card.Meta>
            <span className='date'>{selectedActivity.Date}</span>
          </Card.Meta>
          <Card.Description>
          {selectedActivity.Description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button.Group widths={2}>
              <Button onClick={() => setEditMode(true)} basic color="blue" content="edit"></Button>
              <Button basic color="grey" content="cancel"></Button>
          </Button.Group>
        </Card.Content>
      </Card>
    );
};

export default ActivityDetail;