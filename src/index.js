"use strict";
import React from 'react';
import ReactDOM from 'react-dom';
import Styles from './styles.css';
import {TodoList, DoneList} from './list-render';

class TodoApp extends React.Component{
    constructor(props){
        super(props);
        this.state = {items:[], userInput:''};
    }

    handleInputChange(e){
        this.setState({userInput: e.target.value});
    }

    handleEnterKey(e){
        if (e.keyCode === 13 && this.state.userInput.length > 0){
            let newItem = {id: Date.now(), description: this.state.userInput, isDone: false};
            let newState = this.state.items.concat([newItem]); //using non-mutating methods
            this.setState({items: newState, userInput: ''});            
        }            
    }

    handleCheck(itemId, e){
        e.preventDefault();
        const itemIndex = this.state.items.findIndex(item=>item.id===itemId);
        const newState = this.state.items.map((item, index) => index === itemIndex ? {...item, isDone: !this.state.items[itemIndex].isDone} : item);
        this.setState({ items: newState });
    }

    handleRemove(itemId,e){
        let newState = this.state.items.filter(item => item.id !== itemId);
        this.setState({items: newState});
    }

    handleClearCompleted(e){
        let newState = this.state.items.filter(item=>!item.isDone);
        this.setState({items: newState});
    }

    render(){
        let todoTasks = this.state.items.filter(item=>!item.isDone);
        let doneTasks = this.state.items.filter(item=>item.isDone);
        return (
            <div>
                <p>Todo list</p>
                <input onChange={e=>this.handleInputChange(e)} onKeyDown={e=>this.handleEnterKey(e)} value={this.state.userInput} type="text" minLength="1" maxLength="50" placeholder="Enter your task"/>
                <TodoList items={todoTasks} fnCheck={(itemId, e) => this.handleCheck(itemId, e)} fnRemove={(itemId, e)=>this.handleRemove(itemId, e)}/>
                <DoneList items={doneTasks} fnCheck={(itemId, e)=>this.handleCheck(itemId, e)} fnRemove={(itemId, e)=>this.handleRemove(itemId, e)} fnClearCompleted={e=>this.handleClearCompleted(e)}/>
            </div>
        )
    }
};

//Render the app
ReactDOM.render(<TodoApp/>, document.getElementById('app'));