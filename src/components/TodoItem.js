import React, { Component } from 'react';
import classNames from 'classnames';

import './TodoItem.css';
import checkImg from '../contents/images/checkbox/check.svg'
import checkCompleteImg from '../contents/images/checkbox/check-complete.svg'

class TodoItem extends Component {
    render() {
        const { item, onClick } = this.props;
        let className = 'TodoItem';
        let url = checkImg;
        if (item.isComplete) {
            url = checkCompleteImg;
        }
        return (
            <div  className={classNames(className, {
                'TodoItem-Complete': item.isComplete
            })}>
                <img onClick={onClick} src={url} alt="CheckBox item"/>
                <p>{item.title}</p>
            </div>
        )
    }
}

export default TodoItem