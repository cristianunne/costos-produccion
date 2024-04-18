import React from 'react'
import Card from 'react-bootstrap/Card';

const GraphicsPlaceHolder = () => {
    return (
        <Card className='card-costos-container mb-5 placeholder-glow bg-blue-lt text-dark' style={{height: '450px'}}>
            <Card.Body className='card-body-costos-container placeholder'>
            </Card.Body>

        </Card>
    )
}

export default GraphicsPlaceHolder