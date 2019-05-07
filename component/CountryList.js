import React, { Component } from 'react';
import { Container, Content, List, ListItem, Text, Left, Right, Icon } from 'native-base';
import axios from 'axios';

const cfg = {
  headers:
    { "X-Auth-Token": "4e28deee415d45da934a8fa94369a8b7" }
};

class CountryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
     data: []
    }
  }

  fetchData() {
    axios.get('http://api.football-data.org/v2/competitions/?plan=TIER_ONE',cfg)
      .then(response => response.data.competitions)
      .then(dat => this.setState({
        data: dat
      }));
  }

  componentDidMount(){
    this.fetchData();
  }
 
  render() {    
    const competitions = this.state.data;   
    return (
      <Container>       
        <Content>
          <List>
             {competitions.map(data => {
              return (
                <ListItem key={data.id} onPress={() => this.props.navigation.navigate('CompetitionList', {id : data.id })}>
                  <Left>
                    <Text>{data.area.name + '-' + data.name}</Text>
                  </Left>
                  <Right>
                    <Icon name="arrow-forward" />
                  </Right>
                </ListItem>
              )
            })}

          </List>
        </Content>
      </Container>
    );
  }
}

export default CountryList;