import React from 'react';

export default ({ messages }) => (
	<div className="messages">
		<div className="messages__title">Отправленные сообщения</div>
		{!messages.items.length && <div className="messages__empty">Пусто</div> }
		{messages.items.length > 0 &&
			<div className="messages__list">
				<div className="messages__row messages__row--header">
					<div className="messages__item messages__item--date">Дата</div>
					<div className="messages__item messages__item--theme">Тема</div>
					<div className="messages__item messages__item--status">Статус</div>
				</div>
				{messages.items.map((message, index) => (
					<div className="messages__row" key={ index }>
						<div className="messages__item messages__item--date">{ message.date }</div>
						<div className="messages__item messages__item--theme">{ message.text }</div>
						<div className="messages__item messages__item--status">{ message.status }</div>
					</div>
				))}
			</div>
		}
	</div>
)