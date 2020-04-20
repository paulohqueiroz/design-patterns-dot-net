import React, { useState, useEffect, Fragment } from 'react';
import '../app/layouts/styles.css';
import axios from "axios";
import { Container } from 'semantic-ui-react';
import { IActivity  } from "../models/IActivity";
import  NavBar from "./NavBar/NavBar";
import ActivityDashboard from './activities/dashboard/ActivityDashboard';

const App = () => {

    const [ activities, setActivities ] = useState<IActivity[]>([]);

    useEffect( () => {
      axios
      .get<IActivity[]>("http://localhost:5000/api/activities")
      .then((response) => {
        setActivities(response.data);
      });
    }, []);

    
    return (
      <Fragment>
         <NavBar />
         <Container style={{ marginTop: "7em" }}>
          <ActivityDashboard activities={activities} />
         </Container>
     </Fragment>
    ); 
}

export default App;
