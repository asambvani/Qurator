import React, { PropTypes } from 'react'
import { Input, Button, Grid } from 'react-bootstrap'
import { reduxForm } from 'redux-form'
import styles from './styles'

const EmailForm = ({
  fields: { name, email },
  handleSubmitClick,
}) => (
  <Grid>
    <h4>Almost done!</h4>
    <h1>Please enter your e-mail to see your results</h1>
    <div>Don't worry we won't spam you</div>
    <form className="form-inline pull-left" >
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
      onClick={handleSubmitClick}
      className={styles.startButton}
    >
      Submit
    </Button>
  </Grid>
)

EmailForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmitClick: PropTypes.func.isRequired,
}

export default reduxForm({
  form: 'qurate-email',
  fields: ['name', 'email'],
})(EmailForm)
