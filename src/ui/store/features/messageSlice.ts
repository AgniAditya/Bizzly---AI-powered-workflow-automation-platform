import { createSlice } from '@reduxjs/toolkit'
import type { Message } from '../../../types/Message'

const messagesSlice = createSlice({
    name: 'messages',
    initialState: { 
        messages: [] as Message[] 
    },
    reducers: {
        addMessage: (state, action) => {
            state.messages.push(action.payload)
        }
    }
})

export const { addMessage } = messagesSlice.actions
export default messagesSlice.reducer