import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TodoItem from './components/TodoItem';

import './App.css';
import checkAllComplete from './contents/images/checkbox/check-all-complete.svg';

class App extends Component {
  constructor() {
    super();
    this.state = {
      newItem: '',
      currentState: 'all',
      // currentState: 'active',
      // currentState: 'completed',
      //à ok :)))
      todoItems: [
        {title:'Đi chơi', isComplete: true},
        {title:'Đi học', isComplete: true},
        {title:'Đi ngủ', isComplete: true},
        {title:'Đi ăn', isComplete: false}
      ],
      numberItems: 0
    }

    this.onKeyUp = this.onKeyUp.bind(this);
    this.onChange = this.onChange.bind(this);
    this.changeState = this.changeState.bind(this);
  }

  onClickedItem(item){
    return(event) => {
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

  getContents(item, index) {
    return (
      <TodoItem 
        key={index}  
        item={item} 
        onClick={this.onClickedItem(item)}
      />
    )
  }

  changeState(event) {
    let state = event.target.value;
    state = (state ==='All')? 'all' : (state === 'Active')? 'active' : 'completed'; 
    this.setState({
      currentState: state 
    })
  }

  loadItembyState(todoItems, currentState) {
    return todoItems.length > 0 && todoItems.map((item, index) => {
      if(currentState ==='active' && !item.isComplete){
        return this.getContents(item, index)
      } else if (currentState === 'completed' && item.isComplete) {
        return this.getContents(item, index)
      } else if (currentState === 'all') {
        return this.getContents(item, index)
      } else return ''
      
    }) 
  }

  render() {
    const { todoItems, newItem, currentState } = this.state;
    let contents;
    
    if (todoItems.length) {
      return (
        <div className="App" id="App">
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
          { 
            this.loadItembyState(todoItems, currentState)
          }
          <div className="Footer">
            <div className="currentItems">
          <p>{todoItems.length} items left</p>
            </div>
            <div className="currentStates">
              <input 
                type="button" 
                id="stateAll" 
                name="stateAll" 
                value="All"
                onClick={this.changeState}
                />
              <input 
                type="button" 
                id="stateActive" 
                name="stateActive" 
                value="Active"
                onClick={this.changeState}
                />
              <input 
                type="button" 
                id="stateCompleted" 
                name="stateCompleted" 
                value="Completed"
                onClick={this.changeState}
              />
            </div>
          </div>
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
