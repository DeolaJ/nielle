import React from 'react'
import { Grid, Image, Segment } from 'semantic-ui-react'
import loader from '../../images/logowhitebox.png'
import './loader.scss'

export default class LoaderHome extends React.PureComponent {
  render () {
    
    return (
      <Grid.Column width={16} className={'loader-home'}>
        <Segment
          basic
          padded={'very'}
          textAlign={'center'}
        >
          <Image
            alt={'Loader image'}
            centered
            size={'small'}
            src={loader}
          />

        </Segment>
      </Grid.Column>
    )
  }
}
