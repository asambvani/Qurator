import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import autobind from 'autobind-decorator'
import { Input, Col, Button } from 'react-bootstrap'
import Select from 'react-select'
import { WithContext as TagsInput } from 'react-tag-input'
import { allTags, allArtists } from 'selectors'
import styles from './styles'

@reduxForm(
  {
    form: 'shop-filter',
    fields: ['stringQuery', 'artist', 'tags'],
  },
  state => ({
    availableTags: allTags(state),
    availatbleAritsts: allArtists(state),
  }),
)
class Filter extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    applyFilter: PropTypes.func.isRequired,
    availableTags: PropTypes.array.isRequired,
    availatbleAritsts: PropTypes.array.isRequired,
  }

  @autobind
  handleTagDelete(i) {
    const { value: tags = [] } = this.props.fields.tags
    tags.splice(i, 1)
    this.props.fields.tags.onChange(tags)
  }

  @autobind
  handleTagAddition(tag) {
    const { value: tags = [] } = this.props.fields.tags
    tags.push({
      id: tags.length + 1,
      text: tag,
    })
    this.props.fields.tags.onChange(tags)
  }

  @autobind
  handleSearchClick(e) {
    e.preventDefault()
    const { applyFilter, fields: { stringQuery, artist, tags } } = this.props

    applyFilter({
      stringQuery: stringQuery.value,
      artist: artist.value,
      tags: tags.value && tags.value.map(tag => tag.text),
    })
  }

  render() {
    const {
      availableTags,
      availatbleAritsts,
      fields: {
        stringQuery,
        artist,
        tags,
      },
    } = this.props

    return (
      <div>
        <form onSubmit={this.handleSearchClick}>
          <Col md={12}>
            <Input
              {...stringQuery}
              label="Search"
              type="text"
              value={stringQuery.value}
            />
            <div className="form-group">
              <label className="control-label">
                <span>Artist</span>
              </label>
              <Select
                value={artist.value}
                options={availatbleAritsts.map(art => ({ value: art, label: art }))}
                onChange={artist.onChange}
              />
            </div>
            <div className="form-group">
              <label className="control-label">
                <span>Tags</span>
              </label>
              <TagsInput
                autofocus={false}
                tags={tags.value}
                suggestions={availableTags}
                handleDelete={this.handleTagDelete}
                handleAddition={this.handleTagAddition}
              />
            </div>
            <Button
              type="submit"
              bsStyle="primary"
              className={styles.search}
              onClick={this.handleSearchClick}
            >
              Search
            </Button>
          </Col>
        </form>
      </div>
    )
  }
}

export default Filter
