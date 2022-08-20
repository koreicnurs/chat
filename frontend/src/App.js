import {Route, Switch} from "react-router-dom";
import Messages from "./containers/Messages/Messages";

const App = () => {
    return (
        <Switch>
            <Route path="/" exact component={Messages}/>
            <Route render={() => <h1>Not Found</h1>}/>
        </Switch>
    );
}

export default App;
