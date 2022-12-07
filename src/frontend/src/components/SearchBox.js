import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

export const SearchBox = () => {

    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword) {
            navigate(`/?keyword=${keyword}&page=1`);
        } else {
            navigate(location.pathname);
        }

    }

    return (
        <Form onSubmit={submitHandler} className='d-flex'>
            <Form.Control
                className='mr-sm-2 ml-sm-5'
                type='text'
                name='q'
                onChange={(e) => setKeyword(e.target.value)}
            >
            </Form.Control>

            <Button type='submit' variant='outline-success' className='p-2 ms-2'>
                Submit
            </Button>
        </Form>
    );
}