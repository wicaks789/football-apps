import CountryList from './component/CountryList';
import CompetitionList from './component/CompetitionList';
import { createStackNavigator, createAppContainer  } from 'react-navigation';


const Navigator = createAppContainer(createStackNavigator({
    Home : { screen : CountryList,
    navigationOptions : () => ({
        title:'Select Competition'
    }) },
    CompetitionList : { screen : CompetitionList,
      navigationOptions : () => ({
        title:'Standings'
    }) }
  },
  {
    initialRouteName : 'Home',
  }))

export default Navigator;

