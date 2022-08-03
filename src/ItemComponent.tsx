import React from 'react';

function ItemComponent(props: any) {
    console.log(props)
    return <div>{props.data.word}</div>
}

export default ItemComponent;