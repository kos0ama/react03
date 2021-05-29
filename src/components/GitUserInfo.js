/* eslint-disable unicode-bom */
import React, { Fragment, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

function GitUserInfo() {
	const [data, setData] = useState([]);
	const [menu, setMenu] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	const userName = 'kos0ama';

	useEffect(() => {
		document.title = `GitUserInfo`;
		setMenu(document.title);
		let ignore = false;

		const fetchData = async () => {
			setIsError(false);
			setIsLoading(true);
			//const result = await axios(
			//	'https://hn.algolia.com/api/v1/search?query=' + query
			//);
			try {
				const result = await axios.get(
					`${'https://api.github.com/users'}/${userName}`
				);
				if (!ignore) setData(result.data);
			} catch (error) {
				setIsError(true);
			}
			if (!ignore) setIsLoading(false);
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
					<div>Loading ...</div>
				) : (
					<ul>
						{data.id} {data.login} {data.repos_url}
					</ul>
				)}
			</Fragment>
		</div>
	);
}

const rootElement = document.getElementById('root');
ReactDOM.render(<GitUserInfo />, rootElement);

export default GitUserInfo;
