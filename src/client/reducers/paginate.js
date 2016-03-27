import union from 'lodash/union'

export default function paginate({ types, getIdAttribute }) {
  const [requestType, successType, failureType] = types

  const updatePagination = (state = {
    isFetching: false,
    nextPageUrl: undefined,
    pageCount: 0,
    ids: [],
  }, action) => {
    switch (action.type) {
      case requestType:
        return Object.assign({}, state, {
          isFetching: true,
        })
      case successType:
        return Object.assign({}, state, {
          isFetching: false,
          ids: union(state.ids, action.response.result),
          nextPageUrl: action.response.nextPageUrl,
          pageCount: state.pageCount + 1,
        })
      case failureType:
        return Object.assign({}, state, {
          isFetching: false,
        })
      default:
        return state
    }
  }

  return function updatePaginationByKey(state = {}, action) {
    switch (action.type) {
      case requestType:
      case successType:
      case failureType: {
        const key = getIdAttribute(action)
        return Object.assign({}, state, {
          [key]: updatePagination(state[key], action),
        })
      }
      default:
        return state
    }
  }
}
