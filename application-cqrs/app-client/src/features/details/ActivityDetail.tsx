import React from "react";
import { Icon, Image, Card, Button} from "semantic-ui-react";

interface IProps {
    openCreateForm?: () => void;
}

const ActivityDetail : React.FC<IProps> = () => {
    return (
        <Card fluid> 
        <Image src='../assets/Images/placeholder.png' wrapped ui={false} />
        <Card.Content>
          <Card.Header>Matthew</Card.Header>
          <Card.Meta>
            <span className='date'>Joined in 2015</span>
          </Card.Meta>
          <Card.Description>
            Matthew is a musician living in Nashville.
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button.Group widths={2}>
              <Button basic color="blue" content="edit"></Button>
              <Button basic color="grey" content="cancel"></Button>
          </Button.Group>
        </Card.Content>
      </Card>
    );
};

export default ActivityDetail;