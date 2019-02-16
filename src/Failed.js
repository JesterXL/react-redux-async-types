import React from 'react'

const fontSizeStyle = {
    fontSize: 'xx-large'
}
const Failed = _ => {
    return (
        <div>
            <p style={fontSizeStyle}><span role="img" aria-label="sadness">😢</span></p>
            <p>Failed to load food list, please try again later.</p>
        </div>

    )
}

export default Failed