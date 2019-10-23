import React, {Component} from 'react'
import { Grid, Header, Card, Button, Modal } from 'semantic-ui-react'
import './samples.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"
import Fade from 'react-reveal/Fade';
import doc from '../../../../docs/test.pdf'
import docIllustration from '../../../../images/doc-small.svg'

class Samples extends Component {

  constructor (props) {
    super (props)

    this.state = {
      modalOpen: false,
      samples: [
        {
          id: 1,
          image: docIllustration,
          name: 'Sample 1',
          url: doc
        },
        {
          id: 2,
          image: docIllustration,
          name: 'Sample 2',
          url: doc
        },
        {
          id: 3,
          image: docIllustration,
          name: 'Sample 3',
          url: doc
        },
        {
          id: 4,
          image: docIllustration,
          name: 'Sample 4',
          url: doc
        },
        {
          id: 5,
          image: docIllustration,
          name: 'Sample 5',
          url: doc
        },
        {
          id: 6,
          image: docIllustration,
          name: 'Sample 6',
          url: doc
        }
      ]
    }

    this.modal = React.createRef()
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleOpen = (url) => () => {
    this.setState({ modalOpen: true })
    if (!this.state.mobile) {
      setTimeout(() => {
        const iframe = document.createElement('embed')
        iframe.style.width = '100%'
        iframe.style.height = '100%'
        iframe.setAttribute('src', url);
        document.querySelector('.sample-modal').appendChild(iframe)
      }, 100)
    } else {
      const doc = document.createElement('a')
      doc.href = url
      doc.setAttribute('target', '_blank')
    }
  }

  handleClose = () => {
    this.setState({ modalOpen: false })
  }

  render () {
    const { mobile } = this.props
    
    const { samples } = this.state

    return (
      <Grid stackable className={'section samples-container'} style={{minHeight: '100vh'}}>
        <svg xmlns="http://www.w3.org/2000/svg" width="1544.32" height="895.82" viewBox="0 0 1544.32 895.82"><title>rocks</title><path d="M736.5,155.5c-61,93-136,132-190,117s-121-121-104-149S796.52,64,736.5,155.5Z" transform="translate(-165.28 -94.68)" fill="#fcf"/><path d="M1674.5,186.5c-22,82-102,197-160,199s-314-35-308-78,36-176,75-170S1696.5,104.5,1674.5,186.5Z" transform="translate(-165.28 -94.68)" fill="#fc9"/><path d="M348.5,953.5c-116.8-111.93,266-220,308-192s71,229,25,229S372.5,976.5,348.5,953.5Z" transform="translate(-165.28 -94.68)" fill="#633"/><path d="M1549.5,888.5c-87-63-58-186,0-212s65-35,138-24S1636.5,951.5,1549.5,888.5Z" transform="translate(-165.28 -94.68)" fill="#336"/><path d="M222.5,414.5c104,58,104,162,104,162s-149,100-160-28S222.5,414.5,222.5,414.5Z" transform="translate(-165.28 -94.68)" fill="#666"/></svg>
        <Grid.Column width={16}>
          <div className={'padded-container'}>
            <Fade bottom={!mobile && true} cascade={!mobile && true}>
              <Header as='h2' className={'section-header'} textAlign='center'>Most Popular Samples</Header>
              <Grid stackable style={{ marginTop: '50px'}}>
                <Grid.Row>
                  <Grid.Column style={{ position: 'relative' }}>
                    <Card.Group itemsPerRow={3} textAlign={'center'} stackable>
                      {
                        samples.map(sample => (
                          <Card raised key={sample.id} centered className={'sample-card'}>
                            <div className={'thumbnail'} style={{ backgroundImage: `url(${docIllustration})` }}></div>
                            <Card.Content>
                              <Card.Header as='h3' textAlign='center'>{sample.name}</Card.Header>
                              <br/>
                              {
                                mobile ?

                                <a href={sample.url} target="_blank" rel="noopener noreferrer" disabled={mobile ? false : true}>
                                  <Button fluid color='blue' className={'primary-sub'}>Preview</Button>
                                </a>

                                :

                                <Button fluid color='blue' className={'primary-sub'} onClick={this.handleOpen(sample.url)}>Preview</Button>
                              }
                              
                            </Card.Content>
                          </Card>
                        ))
                      }
                    </Card.Group>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Fade>
          </div>
          <Modal
            open={this.state.modalOpen}
            onClose={this.handleClose}
            basic
            size='large'
            closeIcon
            className={'sample-modal'}
            >
             
          </Modal>
        </Grid.Column>
      </Grid>
    )
  }
}

export default Samples