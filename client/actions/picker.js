export const PICK_IMAGE = 'PICK_IMAGE'
export const UNPICK_IMAGE = 'UNPICK_IMAGE'
export const RESET_PICKER = 'RESET_PICKER'

export const onImagePick = (image) => ({
  type: PICK_IMAGE,
  image,
})

export const onImageUnpick = (image) => ({
  type: UNPICK_IMAGE,
  image,
})

export const resetPicker = () => ({
  type: RESET_PICKER,
})
