import {Link} from "react-router-dom";

function PageNotFound() {
    return (
        <div>
            <h1>Page Not Found</h1>
            <p>Sorry, we couldn't find the page you were looking for.</p>
            <hr/>
            <p>Try going back to the <Link to="/">home page</Link>.</p>
        </div>
    );
}

export default PageNotFound;