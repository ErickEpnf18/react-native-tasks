import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TaskFormScreen from "./screens/TaskFormScreen";
import HomeScreen from "./screens/HomeScreen";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={({ navigation }) => ({
          title: 'Tasks App',
          headerStyle: { backgroundColor: '#222f3e' },
          headerTitleStyle: { color: '#fff' },
          headerRight: () => (
            <TouchableOpacity onPress={()=> navigation.navigate('TaskFormScreen')}>
              <Text style={{color: '#fff', marginRight: 20, fontSize: 15}}>New</Text>
            </TouchableOpacity>
          )
        })} />
        
        <Stack.Screen name="TaskFormScreen" component={TaskFormScreen} options={{
          title: 'Create a Task',
          headerStyle: { backgroundColor: '#222f3e' },
          headerTitleStyle: { color: '#fff' },
          headerTintColor: { color: '#fff' },
          
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;