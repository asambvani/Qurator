import { createAction } from 'redux-act'

export const pickImage = createAction('Pick image')
export const unpickImage = createAction('Unpick image')
export const showNextPicker = createAction('Show next picker images')
export const resetPicker = createAction('Reset picker')
