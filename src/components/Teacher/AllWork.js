import React from 'react';
import {Card, ListGroup, ListGroupItem, Button} from 'react-bootstrap';

const AllWork = () => {
    return (
    <div className="">
    <Card >
        <Card.Img variant="top" src=''/>
        <Card.Body>
            <Card.Title>Danh Sách Công Việc</Card.Title>
            <Card.Text></Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
            <ListGroupItem>
            <Card.Body>
                <Card.Title>Special title treatment</Card.Title>
                <Card.Text>
                With supporting text below as a natural lead-in to additional content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
            </ListGroupItem>
        </ListGroup>
        <ListGroup className="list-group-flush">
            <ListGroupItem>
            <Card.Body>
                <Card.Title>Special title treatment</Card.Title>
                <Card.Text>
                With supporting text below as a natural lead-in to additional content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
            </ListGroupItem>
        </ListGroup>
        <Card.Body>
            <Card.Link href="#">Card Link</Card.Link>
            <Card.Link href="#">Another Link</Card.Link>
        </Card.Body>
    </Card>
    </div>
    )
}

export default AllWork;