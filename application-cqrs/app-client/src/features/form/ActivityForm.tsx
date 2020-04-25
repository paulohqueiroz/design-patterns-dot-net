import React from "react";
import { Form, Segment, Button} from "semantic-ui-react";

interface IProps {
    openCreateForm?: () => void;
    setEditMode: (editMode: boolean) => void;
}

const ActivityForm : React.FC<IProps> = ({openCreateForm, setEditMode}) => {
    return (
      <Segment clearing>
          <Form>
                <Form.Input placeholder="Title" />
                <Form.TextArea rows={2} placeholder="Description" />
                <Form.Input placeholder="Category" />
                <Form.Input type="date" placeholder="Date" />
                <Form.Input placeholder="City" />
                <Form.Input placeholder="Venue" />  
                <Button floated="right" positive type="submit" content="submit" />
                <Button floated="right" onClick={() => setEditMode(false)}  type="submit" content="cancel" />
          </Form>
      </Segment>

    );
};

export default ActivityForm;