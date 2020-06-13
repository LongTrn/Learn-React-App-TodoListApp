import React, { Component } from 'react';
import TodoItem from './components/TodoItem';

import './App.css';
import checkAllComplete from './contents/images/checkbox/check-all-complete.svg';

class App extends Component {
  constructor() {
    super();
    this.state = {
      todoItems: [
        {title:'Đi chơi', isComplete: true},
        {title:'Đi học', isComplete: true},
        {title:'Đi ngủ', isComplete: true},
        {title:'Đi ăn', isComplete: false}
      ]
    }
  }

  onClickedItem(item){
    return(event) => {
      console.log(item.title)
      const isComplete = item.isComplete;
      const { todoItems } = this.state;
      const index = todoItems.indexOf(item);
      this.setState({
        todoItems: [
          ...todoItems.slice(0, index), 
          {
            ...item,
            isComplete: !isComplete
          },
          ...todoItems.slice(index + 1)
        ]
      })
      
    }; 
  }

  render() {
    const { todoItems } = this.state;
    if (todoItems.length) {
      return (
        <div className="App">
          <div className="Header">
            <img src={checkAllComplete}/>
          </div>
          { todoItems.length > 0 && todoItems.map((item, index) => 
            <TodoItem 
              key={index}  
              item={item} 
              onClick={this.onClickedItem(item)}
            />
          )}
        </div>
      );
    } else {
      return (
        <div className="App">
          { todoItems.length === 0 && 'Nothing in the list.'}
        </div>
      );
    }
  }
}

export default App;
