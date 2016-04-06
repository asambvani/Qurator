export default {
  entities: { images: {} },
  qurator: {
    step: 0,
    picker: {
      imageIds: [],
      selectedIds: [],
    },
    selectedImages: [],
    resultFromServer: [],
  },
  cart: [],
  imagesFilter: { isFetching: false, ids: [] },
}
