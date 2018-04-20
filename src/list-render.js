"use strict";
import React from 'react';

export class TodoList extends React.Component{
    render(){
        if (this.props.items.length > 0)
            return(
                <div>
                    <p>Uncompleted tasks</p>
                    <ul>           
                        {this.props.items.map((item,key)=>{                    
                            return (
                                <li key={key}>
                                    <input type="checkbox" onChange={e=>this.props.fnCheck(item.id,e)}/>
                                    {item.description}
                                    <button type="button" onClick={e=>this.props.fnRemove(item.id,e)}>Remove</button>
                                </li>                    
                            )
                        })}
                    </ul>
                </div>
            );
        return null
    }
};

export class DoneList extends React.Component{
    render(){
        if (this.props.items.length > 0)
            return(
                <div>
                <p>Completed tasks</p>
                    <ul>           
                        {this.props.items.map((item,key)=>{                    
                            return (
                                <li key={key} className="strike-text">
                                    <input type="checkbox" onChange={e=>this.props.fnCheck(item.id,e)} checked/>
                                    {item.description}
                                    <button type="button" onClick={e=>this.props.fnRemove(item.id,e)}>Remove</button>
                                </li>
                            )
                        })}
                    </ul>
                    <button type="button" onClick={e=>this.props.fnClearCompleted(e)}>Clear completed</button>
                </div>                    
            );
        return null
    }
};