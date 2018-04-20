"use strict";
import React from 'react';
import ReactDOM from 'react-dom';
import styles from './styles.css';
import {TodoList, DoneList} from './list-render';

class TodoApp extends React.Component{
    constructor(props){
        super(props);
        this.state = {items:[], userInput:''};
        this.handleCheck = this.handleCheck.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleClearCompleted = this.handleClearCompleted.bind(this);
    }

    handleInputChange(e){
        e.target.value.trim().length > 0 ? this.setState({userInput: e.target.value}) : null;        
    }

    handleEnterKey(e){
        if (e.keyCode === 13){//Handle enter key
            let userInput = this.state.userInput;
            if (userInput.length > 0){
                let newItem = { id: Date.now(), description: userInput, isDone: false};
                this.state.items.push(newItem);
                this.setState({userInput: ''});
            }
        }    
    }

    handleCheck(itemId,e){
        e.preventDefault();
        let itemIndex = this.state.items.findIndex(item=>item.id===itemId);
        this.state.items[itemIndex].isDone = e.target.checked;
        this.forceUpdate(); //rerender list
    }

    handleRemove(itemId,e){
        let itemIndex = this.state.items.findIndex(item=>item.id===itemId);
        this.state.items.splice(itemIndex,1);
        this.forceUpdate();
    }

    handleClearCompleted(e){
        this.state.items = this.state.items.filter(item=>!item.isDone);
        this.forceUpdate();
    }

    render(){
        let todoTasks = this.state.items.filter(item=>!item.isDone);
        let doneTasks = this.state.items.filter(item=>item.isDone);
        return (
            <div>
                <p>Todo list</p>
                <input onChange={(e)=>this.handleInputChange(e)} onKeyDown={(e)=>this.handleEnterKey(e)} type="text" value={this.state.userInput} minLength="1" maxLength="50"/>
                <TodoList items={todoTasks} fnCheck={this.handleCheck} fnRemove={this.handleRemove}/>
                <DoneList items={doneTasks} fnCheck={this.handleCheck} fnRemove={this.handleRemove} fnClearCompleted={this.handleClearCompleted}/>
            </div>            
        )
    }
};

//Render the app
ReactDOM.render(<TodoApp/>, document.getElementById('app'));