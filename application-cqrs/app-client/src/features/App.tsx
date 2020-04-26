import React, { useState, useEffect, Fragment } from 'react';
import '../app/layouts/styles.css';
import axios from "axios";
import { Container, ItemMeta } from 'semantic-ui-react';
import { IActivity  } from "../models/IActivity";
import  NavBar from "./NavBar/NavBar";
import ActivityDashboard from './activities/dashboard/ActivityDashboard';

//lição 62

const App = () => {

    const [ activities, setActivities ] = useState<IActivity[]>([]);
    const [ selectedActivity, setSelectActivity ] = useState<IActivity | null>(null);

    const handleSelectActivity = (id: string) => {
      setSelectActivity(activities.filter((a) => a.Id === id)[0]);
    }

    const [editMode, setEditMode] = useState(false);

    const handleOpenCreateForm = () => {
      setSelectActivity(null);
      setEditMode(true);
    }

    useEffect( () => {
      axios
      .get<IActivity[]>("http://localhost:5000/api/activities")
      .then((response) => {
        setActivities(response.data);
      });
    }, []);

    
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
          />
         </Container>
     </Fragment>
    ); 
}

export default App;
