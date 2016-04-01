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
    initialValues: {
      // tags: [{ id: 1, text: 'Apples' }],
      // size: options.size[0],
      // qty: 1,
    },
  },
  // null,
  // {}
)
class Filter extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    fields: PropTypes.object,
    resetForm: PropTypes.func,
    handleSearchClick: PropTypes.func,
  }

  state = {
    tags: [{ id: 1, text: 'Apples' }],
  }

  @autobind
  handleDelete(i) {
    const { value: tags = [] } = this.props.fields.tags
    tags.splice(i, 1)
    this.props.fields.tags.onChange(tags)
  }

  @autobind
  handleAddition(tag) {
    const { value: tags = [] } = this.props.fields.tags
    tags.push({
      id: tags.length + 1,
      text: tag,
    })
    this.props.fields.tags.onChange(tags)
  }

  render() {
    // filter: title,description,artist,artistBio,tags,scene
    const {
      handleSearchClick,
      handleSubmit,
      fields: {
        title,
        description,
        artist,
        artistBio,
        tags,
        scene,
      },
    } = this.props

    const suggestions = ['asudo', 'test']

    return (
      <div>
        <form onSubmit={handleSubmit}>
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
                tags={tags.value}
                suggestions={suggestions}
                handleDelete={this.handleDelete}
                handleAddition={this.handleAddition}
              />
            </div>
          </Col>
        </form>
        <Col md={12}>
          <Button
            bsStyle="primary"
            className={styles.search}
            onClick={handleSearchClick}
          >
            Search
          </Button>
        </Col>
      </div>
    )
  }
}

export default Filter

