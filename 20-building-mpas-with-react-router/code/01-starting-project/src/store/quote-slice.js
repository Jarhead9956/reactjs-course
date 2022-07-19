import { createSlice } from '@reduxjs/toolkit'

const quoteSlice = createSlice({
    name: 'quoteSlice',
    initialState: {
        quotes: []
    },
    reducers: {
        addItemToQuotes(state, actions) {
            const newQuote = actions.payload
            state.quotes.push(newQuote)
        },
        updateQuotes(state, actions) {
            const updatedQuote = actions.payload
            const existingQuote = state.quotes.find(quote => quote.id === updatedQuote.id)

            if(existingQuote && updatedQuote.comments) {
                existingQuote.comments = updatedQuote.comments
            }
        }
    }
})

export const quoteActions = quoteSlice.actions

export default quoteSlice