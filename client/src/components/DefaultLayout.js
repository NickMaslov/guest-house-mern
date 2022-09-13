import React from 'react';

function DefaultLayout({ children }) {
    return (
        <div>
            <div className='header bs1'>
                <div className='d-flex justify-content-between'>
                    <h1>Guest House</h1>

                    <button>user</button>
                </div>
            </div>

            <div className='content'>{children}</div>
        </div>
    );
}

export default DefaultLayout;
