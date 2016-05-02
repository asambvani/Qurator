import React, { PropTypes } from 'react'
import { Input, Button } from 'react-bootstrap'
import styles from './styles'

const EmailForm = ({
  fields: { name, email },
  handleSubmitClick,
  handleRestartClick,
}) => (
  <div>
    <h4 className={styles.almostD}> Almost done!</h4>
    <h1 className={styles.enterEmail}>Please enter your e-mail <br />to see your results</h1>
    <div className={styles.subHeader}>Don't worry we won't spam you</div>
    <form className={`form ${styles.mainForm}`}>
      <Input
        {...name}
        type="text"
        value={name.value}
        placeholder="Type in your name ..."
        className={[styles.paddingForm, styles.inputName]}
      />
      <Input
        {...email}
        type="text"
        placeholder="Enter your email address"
        className={[styles.paddingForm, styles.inputEmail]}
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
    <div className={styles.subActions}>
      <a className={styles.action} onClick={handleRestartClick}>
        Restart the Quiz
      </a>
      <a className={styles.action} onClick={handleSubmitClick}>
        Skip
      </a>
    </div>
  </div>
)

EmailForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmitClick: PropTypes.func.isRequired,
  handleRestartClick: PropTypes.func.isRequired,
}

export default EmailForm
