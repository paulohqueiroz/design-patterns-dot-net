import React, { Component } from 'react';
import '../app/layouts/Styles.css';
import axios from "axios";
import { Header, Icon, List } from 'semantic-ui-react';

class App extends Component {

  state = {
    values : []
  }
  
  componentDidMount(){

     axios.get("http://localhost:5000/api/values").then((response) => {
        console.log(response)
        this.setState({
          values: response.data
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
                this.state.values.map((item : any) => (
                    <List.Item key={item.id}> 
                      {item.name}
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
