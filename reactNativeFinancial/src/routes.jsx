import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();


//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//const Tab = createBottomTabNavigator();


import Login from './pages/Login';
/*
import Home from './pages/Home';
import SelectedBank from './pages/SelectedBank';
import SelectedAccount from './pages/SelectedAccount';
import CreditCard from './pages/Creditcard';
import SelectedCreditCard from './pages/SelectedCreditCard';
import Transactions from './pages/Transactions';
import Investments from './pages/Investments';
import CashPayment from './pages/CashPayment';
*/


export default function Routes() {

 return (

/*
 <Tab.Navigator
    screenOptions={{
      headerShown: false
    }}
  >

    <Tab.Screen   
      name='Login'
      component={Login}
    />

     <Tab.Screen
      name='Home'
      component={Home}
    />
      
  </Tab.Navigator>
 */

  
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >      
     
      <Stack.Screen
        name='Login'
        component={Login}
      /> 

      
     {/*  <Stack.Screen
        name='Home'
        component={Home}
      />

      <Stack.Screen
        name='SelectedBank'
        component={SelectedBank}
      />

      <Stack.Screen
        name='SelectedAccount'
        component={SelectedAccount}
      />

      <Stack.Screen
        name='CreditCard'
        component={CreditCard}
      />

      <Stack.Screen
        name='SelectedCreditCard'
        component={SelectedCreditCard}
      />  

      <Stack.Screen
        name='Transactions'
        component={Transactions}
      />

      <Stack.Screen
        name='Investments'
        component={Investments}
      />
     
      <Stack.Screen
        name='CashPayment'
        component={CashPayment}
      />
      */}
    </Stack.Navigator> 

  )
};
