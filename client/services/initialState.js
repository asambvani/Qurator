export default {
  entities: { images: {} },
  qurator: {
    step: 0,
    picker: {
      step: 0,
      imageIds: [],
      selectedIds: [],
    },
    selectedImages: [],
    resultFromServer: [],
  },
  cart: [],
  imagesFilter: { isFetching: false, ids: [] },
}
