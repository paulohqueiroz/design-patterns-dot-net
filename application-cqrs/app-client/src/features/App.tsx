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

  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [target, setTarget] = useState('');

 

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if(activityStore.loadingInitial) return <LoadingComponent content="loading appication..."/>

  const handleDeleteActivity = (event: SyntheticEvent<HTMLButtonElement>,id: string) => {
 
    setSubmitting(true);
    setTarget(event.currentTarget.name);

    agent.Activities.delete(id).then(()=>{
      setActivities([...activities.filter(a => a.Id !== id)])
    }).then(()=> setSubmitting(false));  
  }

  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
         <ActivityDashboard
          activities={activityStore.activities}
          deleteActivity={handleDeleteActivity}
          target={target}
          submitting={submitting}
        />
      </Container>
    </Fragment>
  );
}

export default observer(App);
