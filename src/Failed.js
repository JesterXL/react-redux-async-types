import React from 'react'

const fontSizeStyle = {
    fontSize: 'xx-large'
}
const Failed = ({ error }) => {
    return (
        <div data-cy-error-screen>
            <p style={fontSizeStyle}><span role="img" aria-label="sadness">😢</span></p>
            <p>Failed to load food list, please try again later.</p>
            <p>Reason: {error.message}</p>
        </div>

    )
}

export default Failed