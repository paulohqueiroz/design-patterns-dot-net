import React, { useEffect, Fragment, useContext } from 'react';
import '../app/layouts/styles.css';
import { Container } from 'semantic-ui-react';
import NavBar from "./NavBar/NavBar";
import ActivityDashboard from './activities/dashboard/ActivityDashboard';
import LoadingComponent from '../app/layouts/LoadingComponent';
import { observer } from 'mobx-react-lite';
import ActivityStore from '../app/stores/activityStore';
import { Route } from 'react-router-dom';
import Home from './home/Home';
import ActivityForm from './form/ActivityForm';
import ActivityDetail from './details/ActivityDetail';

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
        <Route exact path="/"         component={Home} />
        <Route exact path="/activities/:Id" component={ActivityDetail} />
        <Route path="/createActivity" component={ActivityForm} />
        <Route path="/activityList" component={ActivityDashboard} />
      </Container>
    </Fragment>
  );
}

export default observer(App);
