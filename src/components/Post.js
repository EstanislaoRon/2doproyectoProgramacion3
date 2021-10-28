import React from 'react';
import {Text} from 'react-native'

function Post (props){
    return(
        <React.Fragment>
            <Text>{props.info.data.userName}</Text>
            <Text>{props.info.data.poducto}</Text>
            <Text>{props.info.data.description}</Text>
        </React.Fragment>
    )
}
export default Post

//cambiar a estado likes; 0, liked; false