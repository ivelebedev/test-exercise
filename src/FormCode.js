import React from 'react';
import { Field, reduxForm } from 'redux-form';

const validate = values => {
    const errors = {}
    if (!values.name_from) {
      errors.name_from = 'Не может быть пустым'
    } else if (values.name_from.length < 2) {
      errors.name_from = 'Minimum be 2 characters or more'
    }
    if (!values.email_from) {
      errors.email_from = 'Не может быть пустым'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email_from)) {
      errors.email_from = 'Invalid email address'
    }
    if (!values.theme) {
        errors.theme = 'Не может быть пустым'
      } else if (values.theme.length < 2) {
        errors.theme = 'Minimum be 2 characters or more'
      }
    return errors
  }

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
	<div>
	<input {...input} placeholder={label} type={type} className="input" />
        {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  )

let FormCode = props => {
  const { handleSubmit, pristine, submitting } = props;
  return (
	<div class="form">
		<div class="form__title">Отправлялка сообщений</div>
		
		<form onSubmit={ handleSubmit }>
			<div class="form__row">
				<div class="form__label">От кого</div>
				<div class="form__input">
					<Field name="name_from" component={renderField} label="Имя" />
					<Field name="email_from" component={renderField} label="Email" />
				</div>
			</div>
			<div class="form__row">
				<div class="form__label">Кому</div>
				<div class="form__input">
					<Field name="name_to" component={renderField} label="Имя" />
					<Field name="email_to" component={renderField} label="Email" />
				</div>
			</div>
			<div class="form__row">
				<div class="form__label">Тема письма</div>
				<div class="form__input">
					<Field name="theme" component={renderField} label="Тема письма" />
				</div>
			</div>
			<div class="form__row">
				<div class="form__label">Сообщение</div>
				<div class="form__input">
					<textarea className="input">Проекция угловых скоростей, например, поступательно заставляет иначе взглянуть на то, что такое момент силы трения. Движение спутника вращает волчок. Начальное условие движения велико.</textarea>
				</div>
			</div>
			
			<div class="form__row">
				<input type="file" name="file" id="file" className="select-file" />
			</div>
			<div class="form__row">
				<button type="submit" disabled={pristine || submitting} className="btn">Отправить</button>
			</div>
		</form>
	</div>
  )
}
FormCode = reduxForm({
  form: 'contact',
  validate,
})(FormCode);

export default FormCode;