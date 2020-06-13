import React, { Component } from 'react';
import TodoItem from './components/TodoItem';

import './App.css';
import checkAllComplete from './contents/images/checkbox/check-all-complete.svg';

class App extends Component {
  constructor() {
    super();
    this.state = {
      newItem: '',
      todoItems: [
        {title:'Đi chơi', isComplete: true},
        {title:'Đi học', isComplete: true},
        {title:'Đi ngủ', isComplete: true},
        {title:'Đi ăn', isComplete: false}
      ]
    }

    this.onKeyUp = this.onKeyUp.bind(this);
    this.onChange = this.onChange.bind(this);
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

  onKeyUp(event) {
    if (event.keyCode === 13) {// Enter as ASCII 
      let text = event.target.value;
      if(!text) {
        return;
      }
  
      text = text.trim();
      if(!text) { return;}
  
      this.setState({
        newItem: '',
        todoItems: [
          { title: text, isComplete:false },
          ...this.state.todoItems
        ]
      });
    }
  }

  onChange(event) {
    this.setState({
      newItem: event.target.value
    });
  }

  render() {
    const { todoItems, newItem } = this.state;
    if (todoItems.length) {
      return (
        <div className="App">
          <div className="Header">
            <img src={checkAllComplete} alt="CheckBox all items"/>
            <input 
              type="text" 
              id="new-TodoItem" 
              value={newItem}
              onChange={this.onChange}
              placeholder="Add new to-do item in list here."
              onKeyUp={this.onKeyUp}
            />
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
