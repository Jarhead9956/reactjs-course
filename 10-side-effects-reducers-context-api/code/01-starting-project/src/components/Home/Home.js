import React, {useContext} from 'react';

import Card from '../UI/Card/Card';
import classes from './Home.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../contexts/aurh-context';
import ThemeContext from '../../contexts/theme-context';

const Home = (props) => {
  const themeContext = useContext(ThemeContext)
  

  return (
    <Card className={`${classes.home} ${
      (themeContext.type === 'yellow') ? classes.white : classes.yellow 
    }`}>
      <h1>Welcome back!</h1>
      <Button onClick={themeContext.onChangeTheme}>Change theme color: {themeContext.type}</Button>
    </Card>
  );
};

export default Home;
