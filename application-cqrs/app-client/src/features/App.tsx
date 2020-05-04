import React, { useEffect, Fragment, useContext } from 'react';
import '../app/layouts/styles.css';
import { Container } from 'semantic-ui-react';
import NavBar from "./NavBar/NavBar";
import ActivityDashboard from './activities/dashboard/ActivityDashboard';
import LoadingComponent from '../app/layouts/LoadingComponent';
import { observer } from 'mobx-react-lite';
import ActivityStore from '../app/stores/activityStore';

const App = () => {

  const activityStore = useContext(ActivityStore);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if(activityStore.loadingInitial) return <LoadingComponent content="loading appication..."/>

  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
         <ActivityDashboard/>
      </Container>
    </Fragment>
  );
}

export default observer(App);
