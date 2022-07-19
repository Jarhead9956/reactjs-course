import QuoteList from "../components/quote/QuoteList"

const AllQuotes = (props) => {
    return(
        <QuoteList quoteData={props.quoteData} />
    )
}

export default AllQuotes