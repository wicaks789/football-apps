import React, { Component } from 'react';
import { Container, Content, List, ListItem,  Right, Left, Text } from 'native-base';
import axios from 'axios';

const cfg = {
  headers:
    { "X-Auth-Token": "4e28deee415d45da934a8fa94369a8b7" }
};

export default class CompetitionList extends Component {
  constructor(props) {
    super(props);
    this.state = {      
      data: []
    }
  }

  fetchData() {
    const id = this.props.navigation.state.params.id;
    
    axios.get('http://api.football-data.org/v2/competitions/' + id + '/standings', cfg)
      .then(response => response.data.standings)
      .then(datas => this.setState({
        data: datas
      }))
      .catch(err => {
        console.log(err)
      });
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    const teams = this.state.data.filter(w => w.type === 'TOTAL');
    return (
      <Container>
        <Content>
          <List>
            <ListItem itemDivider>
              <Left>
                <Text>#</Text>
              </Left>
              <Right>
                  <Text>P PTS</Text>                             
              </Right>

            </ListItem>
            {
              teams.length > 0 ?
                teams[0].table.map(data => {
                  return (
                    <ListItem key={data.position} onPress={() => this.props.navigation.navigate('CompetitionList', { id: data.id })}>
                      <Left>
                        <Text>{data.position} {data.team.name}</Text>                       
                      </Left>                     
                      <Right>                                          
                        <Text>{data.playedGames} {data.won}</Text>                  
                                            
                      </Right>
                    </ListItem>
                  )
                }) : <Text>Loading...</Text>}

          </List>
        </Content>
      </Container>
    )
  }
}