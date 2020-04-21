import React from "react";
import { Form, Segment} from "semantic-ui-react";

interface IProps {
    openCreateForm?: () => void;
}

const ActivityForm : React.FC<IProps> = ({openCreateForm}) => {
    return (
      <Segment>
          <Form>
                <Form.Input placeholder="Title" />
                <Form.TextArea rows={2} placeholder="Description" />
                <Form.Input placeholder="Category" />
                <Form.Input type="date" placeholder="Date" />
                <Form.Input placeholder="City" />
                <Form.Input placeholder="Venue" />  
          </Form>
      </Segment>

    );
};

export default ActivityForm;