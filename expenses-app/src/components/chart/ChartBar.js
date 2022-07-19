import React from "react"
import './ChartBar.css'

const ChartBar = (props) => {
    let fillHeight = 0

    if(props.value > 0) {
        fillHeight = Math.round((props.value / props.max) * 100) + '%'
    }

    return(
        <div className="chart">
            <div className="scale">
                <div className="empty">
                    <div className="fill" style={{ height: fillHeight }}></div>
                </div>
            </div>
            <p className="month">{ props.monthValue }</p>
        </div>
    )
}

export default ChartBar