import React from "react";

import {Link} from "react-router-dom"

const mainPage = () =>(
	<div>
		<h1>DrawOops Main Page</h1>
		<Link to='/join'>join</Link><br/>
		<Link to='/start'>start new game</Link>
	</div>
);


export default mainPage