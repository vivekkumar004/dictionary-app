import React from 'react';


function ItemComponent(props: any) {

    const items = props.data.meanings.map((item: any) => {
        return
        <div>
            <div>props.data.word</div>
            <div>item.definitions.definition</div>
        </div>
    })

    return <div><p>{props.data.word}</p>
        {items}
    </div>

}

export default ItemComponent;