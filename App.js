import React from 'react'
import {
  View,
  ActivityIndicator
} from 'react-native'
import { Provider } from 'react-redux'
import { store } from './src/redux/store'
import Todo from './src/Screens/todo'

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Todo/>
      </Provider>
    )
  }
}
export default App
