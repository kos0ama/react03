/* eslint-disable unicode-bom */
import React, { useState } from 'react';

function Todo() {
	const [value, setValue] = useState('');
	const [todoList, setTodoList] = useState([]);
	const handleChange = (e) => {
		const newValue = e.target.value;
		setValue(newValue);
	};

	const add = () => {
		const newTodo = { id: todoList.length, content: value };
		const newTodoList = [...todoList, newTodo];
		setTodoList(newTodoList);
		setValue('');
	};

	const handleDelete = (id) => {
		const newTodoList = todoList.filter((todo) => todo.id !== id);
		setTodoList(newTodoList);
	};
	return (
		<div>
			<h5>Todo App</h5>
			<input type="text" value={value} onChange={handleChange} />
			<button onClick={add}>追加</button>
			<ul>
				{todoList.map((todo) => (
					<li key={todo.id}>
						{todo.content}
						<button onClick={() => handleDelete(todo.id)}>削除</button>
					</li>
				))}
			</ul>
		</div>
	);
}

export default Todo;
