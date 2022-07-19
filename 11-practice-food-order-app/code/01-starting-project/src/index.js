import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';
import {OrderedMealContextProvider} from './components/contexts/orderedMeal-Context'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <OrderedMealContextProvider>
        <App />
    </OrderedMealContextProvider>
);
