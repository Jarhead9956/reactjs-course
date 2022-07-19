import React from "react"
import './MonthChart.css'
import ChartBar from "./ChartBar"

const MonthChart = (props) => {
    const dataPointValues = props.dataPoint.map(dataPoint => dataPoint.value)
    const maxValue = Math.max(...dataPointValues)
    
    return (
        <div className="chart-container">
            { props.dataPoint.map((el, ind) => {
                return (
                    <ChartBar 
                        max={ maxValue }
                        value={ el.value } 
                        monthValue={ el.label } 
                        key={ `chart-${ind}` }  
                    />
                )
            }) }
        </div>
    )
}

export default MonthChart