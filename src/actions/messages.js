
function addMessageAction(message) {
    return {
        type: 'ADD_MESSAGE',
        message: message
    }
}

export function addMessage(message) {
    return dispatch => {
        addMessageAction(message);
    }
}



function setMessagesAction(message) {
    return {
        type: 'SET_MESSAGES',
        messages: messages
    }
}

export function setMessages(messages){
    return dispatch => {
        setMessagesAction(message)
    }
}