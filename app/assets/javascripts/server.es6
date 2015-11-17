import ReactDOM from 'react-dom';
import Router from 'react-router';
import Routes from 'react/config/routes.js';

// TODO: Relay Networking Component

function renderToString(path){
    var htmlRegex = /¡HTML!/;
    var dataRegex = /¡DATA!/;

    var router = Router.create({
        routes: Routes,
        location: path,
        onAbort: function (redirect) {
            console.log('Routing Abort');
            console.log(err);
        },
        onError: function (err) {
            console.log('Routing Error');
            console.log(err);
        }
    });

    router.run((Handler, state) => {
        console.log(state)
        React.renderToString(Handler)
    })
}