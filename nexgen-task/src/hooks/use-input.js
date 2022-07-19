import React, {useState} from "react"

const useInput = (conditionFunc) => {
    const [enteredValue, setinputValue] = useState('')
    const [isTouched, setInputIsTouched] = useState(false)

    const valueIsValid = conditionFunc(enteredValue)
    const hasError = !valueIsValid && isTouched

    const changeValueHandler = (event) => {
        setinputValue(event.target.value)
    }
    
    const inputBlurHandler = (event) => {
        setInputIsTouched(true)
    }

    const reset = () => {
        setinputValue('')
        setInputIsTouched(false)
    }

    return {
        enteredValue,
        isTouched,
        valueIsValid,
        hasError,
        changeValueHandler,
        inputBlurHandler,
        reset  
    }
}

export default useInput