import React, { useState, useEffect, Fragment } from 'react';
import '../app/layouts/styles.css';
import axios from "axios";
import { Container } from 'semantic-ui-react';
import { IActivity } from "../models/IActivity";
import NavBar from "./NavBar/NavBar";
import ActivityDashboard from './activities/dashboard/ActivityDashboard';

const App = () => {

  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectActivity] = useState<IActivity | null>(null);

  const handleSelectActivity = (id: string) => {
    setSelectActivity(activities.filter((a) => a.Id === id)[0]);
    setEditMode(false);
  }

  const [editMode, setEditMode] = useState(false);

  const handleOpenCreateForm = () => {
    setSelectActivity(null);
    setEditMode(true);
  }

  useEffect(() => {
    axios
      .get<IActivity[]>("http://localhost:5000/api/activities")
      .then((response) => {
        setActivities(response.data);
      });
  }, []);

  const handleCreateActivity = (activity: IActivity) => {
    setActivities([...activities, activity]);
    setSelectActivity(activity);
    setEditMode(false);
  }

  const handleEditActivity = (activity: IActivity) => {
    setActivities([...activities.filter(a => a.Id !== activity.Id), activity])
    setSelectActivity(activity);
    setEditMode(false);
  }

  const handleDeleteActivity = (id: string) => {
    setActivities([...activities.filter(a => a.Id !== id)])
  }

  return (
    <Fragment>
      <NavBar openCreateForm={handleOpenCreateForm} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          selectActivity={handleSelectActivity}
          selectedActivity={selectedActivity}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectActivity={setSelectActivity}
          createActivity={handleCreateActivity}
          editActivity={handleEditActivity}
          deleteActivity={handleDeleteActivity}
        />
      </Container>
    </Fragment>
  );
}

export default App;
