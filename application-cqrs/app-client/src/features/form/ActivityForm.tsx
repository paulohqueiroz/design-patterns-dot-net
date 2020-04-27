import React, { useState, FormEvent } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { IActivity } from "../../models/IActivity";
import {v4 as uuid} from 'uuid';


interface IProps {
    setEditMode: (editMode: boolean) => void;
    activity: IActivity;
    createActivity: (activity: IActivity) => void;
    editActivity: (activity: IActivity) => void;
}

const ActivityForm: React.FC<IProps> = ({
    setEditMode,
    activity: initialFormState,
    editActivity,
    createActivity
}) => {

    const initializeForm = () => {
        if (initialFormState) {
            return initialFormState
        } else {
            return {
                Id: '',
                Title: '',
                Description: '',
                Category: '',
                Date: '',
                City: '',
                Venue: ''
            }
        }
    }

    const [activity, setActivity] = useState<IActivity>(initializeForm);

    const handleInputChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.currentTarget;
        setActivity({ ...activity, [name]: value });
    }

    const handleSubmit = () => {
        console.log(activity);
        if (activity.Id.length === 0) {
            let newActivity = {
                ...activity,
                id: uuid()
            };
            createActivity(newActivity);
        } else {
            editActivity(activity);
        }
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit}>
                <Form.Input
                    onChange={handleInputChange}
                    name='Title'
                    placeholder='Title'
                    value={activity.Title}
                />
                <Form.TextArea
                    onChange={handleInputChange}
                    name='Description'
                    rows={2}
                    placeholder='Description'
                    value={activity.Description}
                />
                <Form.Input
                    onChange={handleInputChange}
                    name='Category'
                    placeholder='Category'
                    value={activity.Category}
                />
                <Form.Input
                    onChange={handleInputChange}
                    name='Date'
                    type='datetime-local'
                    placeholder='Date'
                    value={activity.Date}
                />
                <Form.Input
                    onChange={handleInputChange}
                    name='City'
                    placeholder='City'
                    value={activity.City}
                />
                <Form.Input
                    onChange={handleInputChange}
                    name='Venue'
                    placeholder='Venue'
                    value={activity.Venue}
                />
                <Button floated='right' positive type='submit' content='Submit' />
                <Button
                    onClick={() => setEditMode(false)}
                    floated='right'
                    type='button'
                    content='Cancel'
                />
            </Form>
        </Segment>

    );
};

export default ActivityForm;