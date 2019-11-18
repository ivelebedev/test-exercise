import React from 'react';
import { Field, reduxForm } from 'redux-form';

const validate = values => {
	const errors = {}
	
	if (!values.from_name) {
		errors.from_name = 'Не может быть пустым'
	} else if (values.name_from.length < 2) {
		errors.from_name = 'Minimum be 2 characters or more'
	}
	
	if (!values.from_email) {
		errors.from_email = 'Не может быть пустым'
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email_from)) {
		errors.from_email = 'Invalid email address'
	}
	
	if (!values.theme) {
		errors.theme = 'Не может быть пустым'
	} else if (values.theme.length < 2) {
		errors.theme = 'Minimum be 2 characters or more'
	}
	
	console.log(values, errors);
	
	return errors
}

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
	<div>
		<input {...input} placeholder={label} type={type} className="input" />
		{touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
	</div>
)
const renderTextarea = ({ input, label, type, meta: { touched, error, warning } }) => (
	<div>
		<textarea {...input} className="input" placeholder={label}></textarea>
		{touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
	</div>
)

let FormCode = props => {
  const { handleSubmit, pristine, submitting } = props;
  return (
	<div className="form">
		<div className="form__title">Отправлялка сообщений</div>
		
		<form onSubmit={ handleSubmit }>
			<div className="form__row">
				<div className="form__label">От кого</div>
				<div className="form__input">
					<Field name="from_name" component={renderField} label="Имя" />
					<Field name="from_email" component={renderField} label="Email" />
				</div>
			</div>
			<div className="form__row">
				<div className="form__label">Кому</div>
				<div className="form__input">
					<Field name="to_name" component={renderField} label="Имя" />
					<Field name="to_email" component={renderField} label="Email" />
				</div>
			</div>
			<div className="form__row">
				<div className="form__label">Тема письма</div>
				<div className="form__input">
					<Field name="theme" component={renderField} label="Тема письма" />
				</div>
			</div>
			<div className="form__row">
				<div className="form__label">Сообщение</div>
				<div className="form__input">
					<Field name="text" component={renderTextarea} label="Сообщение" />
				</div>
			</div>
			
			<div className="form__row">
				<input type="file" name="file" id="file" className="select-file" />
			</div>
			<div className="form__row">
				<button type="submit" disabled={pristine || submitting} className="btn">Отправить</button>
			</div>
		</form>
	</div>
  )
}
FormCode = reduxForm({
	form: 'message',
	validate
})(FormCode);

export default FormCode;