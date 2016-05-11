import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import autobind from 'autobind-decorator'
import { Input, Col } from 'react-bootstrap'
import Select from 'react-select'
import { cloneDeep } from 'lodash'
import { WithContext as TagsInput } from 'react-tag-input'
import { allTags, allArtists } from 'selectors'

@reduxForm(
  {
    form: 'shop-filter',
    fields: ['stringQuery', 'artist', 'tags'],
    initialValues: { tags: [] },
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
    values: PropTypes.object.isRequired,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.values !== this.props.values) {
      this.invokeSearch(nextProps.values)
    }
  }

  @autobind
  handleTagDelete(i) {
    const tags = cloneDeep(this.props.values.tags)
    tags.splice(i, 1)
    this.props.fields.tags.onChange(tags)
  }

  @autobind
  handleTagAddition(tag) {
    const tags = cloneDeep(this.props.values.tags)
    tags.push({
      id: tags.length + 1,
      text: tag,
    })
    this.props.fields.tags.onChange(tags)
  }

  invokeSearch({ stringQuery, artist, tags } = this.props.values) {
    this.props.applyFilter({
      artist,
      stringQuery,
      tags: tags.map(tag => tag.text),
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
        <form>
          <Col md={12}>
            <Input
              {...stringQuery}
              label="Search"
              type="text"
              value={stringQuery.value}
            />
            <div className="form-group">
              <label className="control-label">
                <span>Filter by artist</span>
              </label>
              <Select
                resetValue={{}}
                value={artist.value}
                onChange={artist.onChange}
                options={availatbleAritsts.map(value => ({ value, label: value }))}
              />
            </div>
            <div className="form-group">
              <label className="control-label">
                <span>Filter by tags</span>
              </label>
              <TagsInput
                autofocus={false}
                tags={tags.value}
                minQueryLength={1}
                suggestions={availableTags}
                handleDelete={this.handleTagDelete}
                handleAddition={this.handleTagAddition}
              />
            </div>
          </Col>
        </form>
      </div>
    )
  }
}

export default Filter
