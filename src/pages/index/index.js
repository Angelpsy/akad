import './index.css';
import './components';

if (module.hot) {
    module.hot.accept('./components.js', function() {});
}
