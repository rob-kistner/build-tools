import React from 'react';
import ReactDOM from 'react-dom';

import ImportedComponent from './app/imported-component';


class App extends React.Component
{
    render() {
        return (
            <div>
                <h2>React &amp; Webpack Tooling</h2>
                <hr/>
                <ImportedComponent />
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.querySelector('#app')
);