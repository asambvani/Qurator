import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import autobind from 'autobind-decorator'
import { Input, Col, Button } from 'react-bootstrap'
import { WithContext as ReactTags } from 'react-tag-input'
import styles from './styles'

@reduxForm(
  {
    form: 'shop-filter',
    fields: ['title', 'description', 'artist', 'artistBio', 'tags', 'scene'],
  },
  null,
  {}
)
class Filter extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    fields: PropTypes.object,
    resetForm: PropTypes.func,
    applyFilter: PropTypes.func,
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
    const {
      applyFilter,
      fields: {
        title,
        description,
        artist,
        artistBio,
        scene,
        tags,
      },
    } = this.props

    applyFilter({
      title: title.value,
      description: description.value,
      artist: artist.value,
      artistBio: artistBio.value,
      scene: scene.value,
      tags: tags.value && tags.value.reduce((res, tag) => {
        res[tag.text] = 1
        return res
      }, {}),
    })
  }

  render() {
    const {
      availableTags,
      fields: {
        title,
        description,
        artist,
        artistBio,
        scene,
        tags,
      },
    } = this.props

    return (
      <div>
        <form onSubmit={this.handleSearchClick}>
          <Col md={6}>
            <Input
              {...title}
              label="Title"
              type="text"
              value={title.value}
              className={styles.paddingForm}
            />
            <Input
              {...description}
              label="Description"
              type="text"
              value={description.value}
              className={styles.paddingForm}
            />
            <Input
              {...scene}
              label="Scene"
              type="text"
              value={scene.value}
              className={styles.paddingForm}
            />
          </Col>
          <Col md={6}>
            <Input
              {...artist}
              label="Artist"
              type="text"
              value={artist.value}
              className={styles.paddingForm}
            />
            <Input
              {...artistBio}
              label="Artist bio"
              type="text"
              value={artistBio.value}
              className={styles.paddingForm}
            />
            <div className="form-group">
              <label className="control-label">
                <span>Tags</span>
              </label>
              <ReactTags
                autofocus={false}
                tags={tags.value}
                suggestions={availableTags}
                handleDelete={this.handleTagDelete}
                handleAddition={this.handleTagAddition}
              />
            </div>
          </Col>
          <Col md={12}>
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
