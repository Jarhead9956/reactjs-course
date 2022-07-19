import { Fragment, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom'

//Import Pages
import AllQuotes from './pages/AllQuotes'
import AddQuote from './pages/AddQuote'
import DetailQuote from './pages/DetailQuote'
import NotFound from './pages/NotFound'

//Import Components
import HeaderNav from './components/HeaderNav'

//Import functions from store
import { quoteActions } from './store/quote-slice'

function App() {
  const allQuotes = useSelector(state => state.quote.quotes)
  const dispatch = useDispatch()

  useEffect(() => {
    fetch('https://educationdb-97121.firebaseio.com/quotes.json')
    .then(response => response.json())
    .then(data => {
      console.log(data)
      for (const key in data) {
        const transformedQuote = {
          id: key,
          author: data[key].author,
          content: data[key].content,
          comments: data[key].comments
        }

        dispatch(quoteActions.addItemToQuotes(transformedQuote))
      }
      
    })
    .catch(error => {
      console.log(error)
    })
  }, [dispatch])

  return (
    <Fragment>
      <header>
        <HeaderNav />
      </header>
      <main>
        <Switch>
          <Route path='/' exact>
            <Redirect to='/allQuote' />
          </Route>
          <Route path='/allQuote'>
            <AllQuotes quoteData={allQuotes} />
          </Route>
          <Route path='/addNewQuote'>
            <AddQuote />
          </Route>
          <Route path='/detail/:quoteId'>
            <DetailQuote quoteData={allQuotes}/>
          </Route>
          <Route path='*'>
            <NotFound />
          </Route>
        </Switch>
      </main>
    </Fragment>
  );
}

export default App;
