import React from 'react';
import {useNavigate} from "react-router-dom";

function NotFound() {

    const navigate = useNavigate();

    return (
        <>
            <article className="not-found">
                <section className="liquify">
                    <h1>404!</h1>
                    <p>Looks like the blocks are taking over...</p>
                    <button onClick={() => navigate('/')}>Let's defeat 'em!</button>
                </section>
            </article>
        </>
    );
}

export default NotFound;