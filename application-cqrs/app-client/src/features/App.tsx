import React, { useState, useEffect, Fragment, SyntheticEvent, useContext } from 'react';
import '../app/layouts/styles.css';
import { Container } from 'semantic-ui-react';
import { IActivity } from "../models/IActivity";
import NavBar from "./NavBar/NavBar";
import ActivityDashboard from './activities/dashboard/ActivityDashboard';
import agent from '../app/services/agent';
import LoadingComponent from '../app/layouts/LoadingComponent';
import { observer } from 'mobx-react-lite';
import ActivityStore from '../app/stores/activityStore';

const App = () => {

  const activityStore = useContext(ActivityStore);

  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectActivity] = useState<IActivity | null>(null);

  const handleSelectActivity = (id: string) => {
    setSelectActivity(activities.filter((a) => a.Id === id)[0]);
    setEditMode(false);
  }

  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [target, setTarget] = useState('');

  const handleOpenCreateForm = () => {
    setSelectActivity(null);
    setEditMode(true);
  }

  useEffect(() => {
    agent.Activities.list()
      .then((response) => {
        setActivities(response);
      }).then(() => {
        setLoading(false);
      });
  }, []);

  if(loading) return <LoadingComponent content="loading appication..."/>

  const handleCreateActivity = (activity: IActivity) => {
    setSubmitting(true);
    agent.Activities.create(activity).then(()=>{
      setActivities([...activities, activity]);
      setSelectActivity(activity);
      setEditMode(false);
    }).then(()=> setSubmitting(false));   
  }

  const handleEditActivity = (activity: IActivity) => {
    agent.Activities.update(activity).then(()=>{
      setActivities([...activities.filter(a => a.Id !== activity.Id), activity])
      setSelectActivity(activity);
      setEditMode(false);
    }).then(()=> setSubmitting(false));    
  }

  const handleDeleteActivity = (event: SyntheticEvent<HTMLButtonElement>,id: string) => {
 
    setSubmitting(true);
    setTarget(event.currentTarget.name);

    agent.Activities.delete(id).then(()=>{
      setActivities([...activities.filter(a => a.Id !== id)])
    }).then(()=> setSubmitting(false));  
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
          target={target}
          submitting={submitting}
        />
      </Container>
    </Fragment>
  );
}

export default observer(App);
