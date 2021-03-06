import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Header, Image, Segment } from 'semantic-ui-react'
import loader from '../../images/loader.svg'
import './loader.scss'

export default class Loader extends React.PureComponent {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
  }
  render () {
    const { loading, message } = this.props

    return (
      loading &&
        <Grid className={'loader-grid'}>
          <Grid.Column width={16} className={'loader'}>
            <Segment
              basic
              padded={'very'}
              textAlign={'center'}
            >
              {<Image
                alt={'Loader image'}
                centered
                size={'small'}
                src={loader}
              />}
              {
                message &&

                <Header as={'h3'} style={{ color: 'white', fontFamily: "''Barlow'', 'Lato', sans-serif !important" }}>
                  {message} ...
              </Header>
              }
            </Segment>
          </Grid.Column>
        </Grid>
    )
  }
}
