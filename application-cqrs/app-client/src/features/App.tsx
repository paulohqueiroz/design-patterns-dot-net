import React, { useState, useEffect } from 'react';
import '../app/layouts/styles.css';
import axios from "axios";
import { Header, Icon, List, Container } from 'semantic-ui-react';
import { IActivity  } from "../models/IActivity";
import  NavBar from "./NavBar/NavBar";

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
      <div>
         <NavBar />
         <Container>
          <List>
            {
                activities.map((item) => (
                    <List.Item key={item.Id}> 
                      {item.Title}
                    </List.Item>
                ))
              }
          </List>
          </Container>
     </div>
    ); 
}

export default App;
