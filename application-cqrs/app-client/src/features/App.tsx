import React, { Component } from 'react';
import '../app/layouts/Styles.css';
import axios from "axios";
import { Header, Icon, List } from 'semantic-ui-react';
import { IActivity  } from "../models/IActivity";


interface IState {
  activities: IActivity[]
}


class App extends Component<{}, IState> {

  state: IState = {
    activities: []
  }

  componentDidMount(){

     axios.get<IActivity[]>("http://localhost:5000/api/activities").then((response) => {
        console.log(response)
        this.setState({
          activities: response.data
        })
      }
     )
    
  }


  render() {
    
    return (
      <div>
         <Header as='h2'>
          <Icon name='users' />
          <Header.Content> 
            Application React                     
          </Header.Content>
          <List>
            {
                this.state.activities.map((item) => (
                    <List.Item key={item.Id}> 
                      {item.Title}
                    </List.Item>
                ))
              }
          </List>
        </Header>
        </div>
    );

  }
  
}

export default App;
