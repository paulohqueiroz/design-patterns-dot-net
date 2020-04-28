import React, { useState, useEffect, Fragment } from 'react';
import '../app/layouts/styles.css';
import { Container } from 'semantic-ui-react';
import { IActivity } from "../models/IActivity";
import NavBar from "./NavBar/NavBar";
import ActivityDashboard from './activities/dashboard/ActivityDashboard';
import agent from '../app/services/agent';


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
    agent.Activities.list()
      .then((response) => {
        setActivities(response);
      });
  }, []);

  const handleCreateActivity = (activity: IActivity) => {
    agent.Activities.create(activity).then(()=>{
      setActivities([...activities, activity]);
      setSelectActivity(activity);
      setEditMode(false);
    });   
  }

  const handleEditActivity = (activity: IActivity) => {
    agent.Activities.update(activity).then(()=>{
      setActivities([...activities.filter(a => a.Id !== activity.Id), activity])
      setSelectActivity(activity);
      setEditMode(false);
    });   
  }

  const handleDeleteActivity = (id: string) => {
    agent.Activities.delete(id).then(()=>{
      setActivities([...activities.filter(a => a.Id !== id)])
    });
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
