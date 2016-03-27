import { CALL_API_SYMBOL, Schemas } from 'middleware/api'

export const USER_REQUEST = 'USER_REQUEST'
export const USER_SUCCESS = 'USER_SUCCESS'
export const USER_FAILURE = 'USER_FAILURE'

function fetchUser(username) {
  return {
    [CALL_API_SYMBOL]: {
      types: [USER_REQUEST, USER_SUCCESS, USER_FAILURE],
      endpoint: `users/${username}`,
      schema: Schemas.USER,
    },
  }
}

export function loadUser(username, requiredFields = []) {
  return (dispatch, getState) => {
    const user = getState().entities.users[username]
    if (user && requiredFields.every(key => user.hasOwnProperty(key))) {
      return null
    }

    return dispatch(fetchUser(username))
  }
}

export const USER_REPOS_REQUEST = 'USER_REPOS_REQUEST'
export const USER_REPOS_SUCCESS = 'USER_REPOS_SUCCESS'
export const USER_REPOS_FAILURE = 'USER_REPOS_FAILURE'

function fetchRepos(username, nextPageUrl) {
  return {
    username,
    [CALL_API_SYMBOL]: {
      types: [USER_REPOS_REQUEST, USER_REPOS_SUCCESS, USER_REPOS_FAILURE],
      endpoint: nextPageUrl,
      schema: Schemas.REPO_ARRAY,
    },
  }
}

export function loadRepos(username, nextPage) {
  return (dispatch, getState) => {
    const {
      nextPageUrl = `users/${username}/repos?sort=created`,
      pageCount = 0,
    } = getState().pagination.reposByUser[username] || {}

    if (pageCount > 0 && !nextPage) {
      return null
    }

    return dispatch(fetchRepos(username, nextPageUrl))
  }
}

export const REPO_REQUEST = 'REPO_REQUEST'
export const REPO_SUCCESS = 'REPO_SUCCESS'
export const REPO_FAILURE = 'REPO_FAILURE'

function fetchRepo(fullName) {
  return {
    [CALL_API_SYMBOL]: {
      types: [REPO_REQUEST, REPO_SUCCESS, REPO_FAILURE],
      endpoint: `repos/${fullName}`,
      schema: Schemas.REPO,
    },
  }
}

export function loadRepo(fullName, requiredFields = []) {
  return (dispatch, getState) => {
    const repo = getState().entities.repos[fullName]
    if (repo && requiredFields.every(key => repo.hasOwnProperty(key))) {
      return null
    }
    dispatch(fetchRepo(fullName))
  }
}

export const CONTRIBUTORS_REQUEST = 'CONTRIBUTORS_REQUEST'
export const CONTRIBUTORS_SUCCESS = 'CONTRIBUTORS_SUCCESS'
export const CONTRIBUTORS_FAILURE = 'CONTRIBUTORS_FAILURE'

function fetchContributors(fullName, nextPageUrl) {
  return {
    fullName,
    [CALL_API_SYMBOL]: {
      types: [CONTRIBUTORS_REQUEST, CONTRIBUTORS_SUCCESS, CONTRIBUTORS_FAILURE],
      endpoint: nextPageUrl,
      schema: Schemas.USER_ARRAY,
    },
  }
}

export function loadContributors(fullName, nextPage) {
  return (dispatch, getState) => {
    const {
      nextPageUrl = `repos/${fullName}/contributors`,
      pageCount = 0,
    } = getState().pagination.contributorsByRepo[fullName] || {}

    if (pageCount > 0 && !nextPage) {
      return null
    }

    dispatch(fetchContributors(fullName, nextPageUrl))
  }
}
