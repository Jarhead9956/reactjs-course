import React, {useContext, useState} from "react"

const ThemeContext = React.createContext({
    type: 'yellow',
    onChangeTheme: () => {}
})

export const ThemeContextProvider = (props) => {
    const [themeColor, setThemeColor] = useState('yellow')
    
    const changeThemeHandler = () => {
        if(themeColor === 'yellow') {
            setThemeColor('white')
        }else {
            setThemeColor('yellow')
        }
    }
    
    return(
        <ThemeContext.Provider
            value={{
                type: themeColor,
                onChangeTheme: changeThemeHandler
            }}
        >
            {props.children}
        </ThemeContext.Provider>
    )
}

export default ThemeContext