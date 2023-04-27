import React from 'react';
import Timer from './Timer';
import SelectFocusMusic from './SelectFocusMusic'
function Main(props) {
    return (
        <div>
            <h1>Hello, {props.name}!</h1>
            <Timer name={props.name} />
            <SelectFocusMusic />
        </div>
    );
}

export default Main;
