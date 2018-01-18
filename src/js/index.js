import React from 'react';
import ReactDOM from 'react-dom';
import ImportedComponent from './app/imported-component';
import '../sass/styles.scss';

class App extends React.Component
{
    render() {
        return (
            <div className="container">
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