import { useLocation, useHistory } from 'react-router-dom'

import Container from '../../UI/container'
import QuoteItem from './QuoteItem'

import styles from './QuoteList.module.css'

const DUMMY_QUOTES = [
    { id: 'q1', author: 'Max', text: 'Learning React is fun!' },
    { id: 'q2', author: 'Maximilian', text: 'Learning React is great!' },
  ];

const sortQuotes = (quotes, ascending) => {
    return quotes.sort((quoteA, quoteB) => {
    if (ascending) {
        return quoteA.id > quoteB.id ? 1 : -1;
    } else {
        return quoteA.id < quoteB.id ? 1 : -1;
    }
    });    
};

const QuoteList = (props) => {
    const data = props.quoteData
    const history = useHistory()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const isSortingAscending = queryParams.get('sort') === 'asc'
    const sortedQuotes = sortQuotes(DUMMY_QUOTES, isSortingAscending)
    
    const changeSortingHandler = () => {
        history.push('/quotes?sort=' + (isSortingAscending ? 'desc' : 'asc'));
    }
    
    return(
        <Container styles={styles.container}>
            <div className={styles.sorting}>
                <button onClick={changeSortingHandler}>
                Sort {isSortingAscending ? 'Descending' : 'Ascending'}
                </button>
            </div>
            <ul className={styles.list}>
                {data.map((item => {
                   return <QuoteItem quote={item} key={item.id}/>
                }))}
            </ul>
        </Container>
    )
}

export default QuoteList