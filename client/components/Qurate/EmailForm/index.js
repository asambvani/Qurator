import React, { PropTypes } from 'react'
import { Input, Button, Grid, Row } from 'react-bootstrap'
import { reduxForm } from 'redux-form'
import styles from './styles'

const EmailForm = ({
  fields: { name, email },
  resetForm,
  handleSubmit,
  handleStartClick,
}) => (
  <Grid>
    <h4>Almost done!</h4>
    <h1>Please enter your e-mail to see your results</h1>
    <div>Don't worry we won't spam you</div>
    <form onSubmit={handleSubmit} className="form-inline pull-left" >
      <Input
        {...name}
        type="text"
        value={name.value}
        placeholder="name"
        className={styles.paddingForm}
      />
      <Input
        {...email}
        type="text"
        placeholder="email"
        className={styles.paddingForm}
      />
    </form>
    <Button
      bsSize="large"
      bsStyle="primary"
      onClick={handleStartClick}
      className={styles.startButton}
    >
      Submit
    </Button>
  </Grid>
)

EmailForm.propTypes = {
  handleStartClick: PropTypes.func,
}

export default reduxForm({
  form: 'qurate-email',
  fields: ['name', 'email'],
})(EmailForm)
