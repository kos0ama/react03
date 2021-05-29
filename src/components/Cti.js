/* eslint-disable unicode-bom */
import React, { Fragment, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
//import qs from 'qs';
import './common.css';

function Cti() {
	const [data, setData] = useState([]);
	const [menu, setMenu] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	useEffect(() => {
		// Update the document title using the browser API
		document.title = `CTI`;
		setMenu(document.title);
		let ignore = false;

		var config = {
			method: 'get',
			url: 'https://marred-geode-raccoon.glitch.me/genesyscloud/oauth',
		};

		const fetchData = async () => {
			setIsError(false);
			setIsLoading(true);

			const result = await axios(config);
			if (!ignore) {
				setData(result);
				setIsLoading(false);
			}
		};

		fetchData();

		return () => {
			ignore = true;
		};
	}, []);

	return (
		<div>
			<h5>{menu}</h5>

			<Fragment>
				{isError && <div>Something went wrong ...</div>}
				{isLoading ? (
					<div className="App">
						<div className="loader">
							<div className="pacman">
								<div></div>
								<div></div>
								<div></div>
								<div></div>
								<div></div>
							</div>
						</div>
					</div>
				) : (
					<p>
						You data is <br></br> {data.data}.
					</p>
				)}
			</Fragment>
		</div>
	);
}

const rootElement = document.getElementById('root');
ReactDOM.render(<Cti />, rootElement);

export default Cti;
