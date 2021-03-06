/* eslint-disable unicode-bom */
import React, { Fragment, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './common.css';

function GetUserList() {
	const [data, setData] = useState({ entities: [] });
	const [menu, setMenu] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	useEffect(() => {
		// Update the document title using the browser API
		document.title = `GetUserList`;
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
					`${'https://marred-geode-raccoon.glitch.me/genesyscloud/get?url=https://api.mypurecloud.jp/api/v2/users?state=active%26pageSize=300'}`
				);
				if (!ignore) setData(result.data);
				//console.log(result.data.entities);
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
					<div className="loader">
						<div className="pacman">
							<div></div>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
						</div>
					</div>
				) : (
					<table border="1" className="tbldesign01">
						<thead>
							<tr>
								<th scope="col">no</th>
								<th scope="col">id</th>
								<th scope="col">name</th>
								<th scope="col">status</th>
								<th scope="col">email</th>
							</tr>
						</thead>
						<tbody>
							{data.entities.map((item, index) => (
								<tr key={item.id}>
									<td>{index + 1}</td>
									<td>{item.id}</td>
									<td>{item.name}</td>
									<td>{item.state}</td>
									<td>{item.email}</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
			</Fragment>
		</div>
	);
}

const rootElement = document.getElementById('root');
ReactDOM.render(<GetUserList />, rootElement);

export default GetUserList;
