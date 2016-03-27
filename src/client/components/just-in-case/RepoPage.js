import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import autobind from 'autobind-decorator'
import { loadRepo, loadContributors } from 'actions/github'

class RepoPage extends Component {
  static propTypes = {
    fullName: PropTypes.string,
    repo: PropTypes.object,
    owner: PropTypes.object,
    loadRepo: PropTypes.func,
    loadContributors: PropTypes.func,
    contributors: PropTypes.array,
  }

  componentWillMount() {
    this.loadData(this.props)
  }

  loadData() {
    const { fullName } = this.props
    this.props.loadRepo(fullName, ['description'])
    this.props.loadContributors(fullName)
  }

  @autobind
  handleLoadMore() {
    const { fullName } = this.props
    this.props.loadContributors(fullName, true)
  }

  renderContributors() {
    const { contributors } = this.props
    return (
      <ul>
        {contributors.map(contributor => (
          <li key={contributor.id}>
             <Link to={`/github/${contributor.login}`}>
               {contributor.login}
             </Link>
          </li>
         ))}
      </ul>
    )
  }

  render() {
    const { fullName, owner, repo } = this.props
    if (!repo) {
      return <h2><i>Loading {fullName} repo...</i></h2>
    }

    const createdAt = new Date(repo.createdAt)
    return (
      <div>
        <h2><Link to={`/github/${owner.login}`}>{owner.login}</Link></h2>
        <img src={owner.avatarUrl} width="100" alt="" />

        <h3>{repo.name} {repo.fork && '(forked)'}</h3>
        <small>Created at: {createdAt.toDateString()}</small>
        <br />
        <small>Language: {repo.language}</small>
        <p>{repo.description}</p>
        <div>
          List of contributors:
          {this.renderContributors()}
          {
            <button onClick={this.handleLoadMore}>
              Load more
            </button>
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { username, reponame } = ownProps.params
  const {
    entities: { users, repos },
    pagination: { contributorsByRepo },
  } = state

  const fullName = `${username}/${reponame}`
  const contributorsPagination = contributorsByRepo[fullName] || { ids: [] }
  const contributors = contributorsPagination.ids.map(id => users[id])

  return {
    fullName,
    contributors,
    repo: repos[fullName.toLowerCase()],
    owner: users[username.toLowerCase()],
  }
}

export default connect(mapStateToProps, {
  loadRepo,
  loadContributors,
})(RepoPage)
