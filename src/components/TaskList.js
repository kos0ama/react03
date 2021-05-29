/* eslint-disable unicode-bom */
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

function TaskList() {
	const userName = 'kos0ama';
	// Declare a new state variable, which we'll call "count"
	const [count, setCount] = useState(0);
	const [data, setData] = useState([]);

	// Similar to componentDidMount and componentDidUpdate:
	useEffect(() => {
		// Update the document title using the browser API
		document.title = `You clicked ${count} times`;
	});

	const getProfile = async () => {
		try {
			//ここでGETメソッドを使用してgithubのプロフィールを取得します。
			const response = await axios.get(
				`${'https://api.github.com/users'}/${userName}`
			);
			console.log(response);
			console.log(response.status);
			setData(response.data.id);
			setCount(response.status);
		} catch (error) {
			//ここでリクエストに失敗した時の処理、メッセージを記述します。
			console.log('error!!');
		}
	};

	return (
		<div className="App">
			<div>
				<button onClick={() => getProfile()}>get profile!</button>
			</div>
			<p>You clicked {count} times</p>
			<button onClick={() => setCount(count + 1)}>Click me</button>
			<p>You data is {data} .</p>
		</div>
	);
}

const rootElement = document.getElementById('root');
ReactDOM.render(<TaskList />, rootElement);

export default TaskList;
