import React, { useContext } from "react";
import { Icon, Image, Card, Button} from "semantic-ui-react";
import { IActivity } from "../../models/IActivity";
import  ActivityStore  from "../../app/stores/activityStore"
import { observer } from "mobx-react-lite";

interface IProps {
    setEditMode: (editMode: boolean) => void;
    setSelectActivity: (activity: IActivity | null ) => void;
}

const ActivityDetail : React.FC<IProps> = ({
    setEditMode,
    setSelectActivity
  }) => {

    const activityStore = useContext(ActivityStore);
    const { selectedActivity: activity } = activityStore;

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

export default observer(ActivityDetail);