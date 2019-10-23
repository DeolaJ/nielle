import React, {Component} from 'react'
import { Grid, Accordion, Header } from 'semantic-ui-react'
import './faq.scss'
import Fade from 'react-reveal/Fade';

class Faq extends Component {

  state = { activeIndex: 0 }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  render() {

    return (
      <Grid stackable className={'section faq-container'} style={{minHeight: '100vh'}}>
        <div className={'padded-container'}>
          <Fade>
            <Header as='h2' className={'section-header'} textAlign='center'>
              Frequently Asked Questions
            </Header>
            <Grid stackable>

              {/* <Grid.Column width={16}>
                <img src={faqIconMobile} alt='faq illustration' style={{ width: '100%' }} />
              </Grid.Column> */}

              <Grid.Column width={16}>

                <Grid stackable>

                  <Accordion>
                    <Accordion.Title as='h3' active={true} index={0} onClick={this.handleClick}> 
                      How does the resume-writing process work?
                    </Accordion.Title>
                    <Accordion.Content active={true}>
                      <p>
                        First-Resume-Aid uses the expert knowledge of our resume writers, combined with feedback from resume-scanning software called applicant tracking systems (ATS). ATS filters applicants based on keywords and formatting, and we analyze your resume using similar technology. 
                      </p>
                      <p>
                        Our expert writers break down this analysis to figure out how to make your resume more effective. Your writer will collaborate with you to provide a first draft, which will be delivered to you in about a week. Then, you'll have another week to provide feedback to your writer, with unlimited rounds of revisions. The process typically takes one to two weeks.
                      </p>
                    </Accordion.Content>
                  </Accordion> 
                  

                
                  <Accordion>
                    <Accordion.Title as='h3' active={true} index={1} onClick={this.handleClick}>
                      How soon will I get my resume?
                    </Accordion.Title>
                    <Accordion.Content active={true}>
                      <p>
                        Once we have your payment and the completely answered questionnaire or copy of your resume, it will take five (5) to seven (7) business days (excluding Saturdays and Sundays) for you to have your initial draft. 
                      </p>
                      <p>
                        After carefully reviewing it, please inform us if we can then write the final copy or if there is a need for revision. Let us know if you wish to expedite the process and we will try to accommodate your request to the best of our abilities.
                      </p>
                    </Accordion.Content>
                  </Accordion> 
                
                
                
                  <Accordion>
                    <Accordion.Title as='h3' active={true} index={2} onClick={this.handleClick}>
                      What qualifications do your writers have?
                    </Accordion.Title>
                    <Accordion.Content active={true}>
                      <p>
                        We have a network of certified professional resume writers, former and current hiring managers, HR professionals, recruiters and professionals with specialized experience in several industries. 
                      </p>
                      <p>
                        This ensures we can match each client with an expert who is a strong match for their needs. 
                      </p>
                    </Accordion.Content>
                  </Accordion> 
                  

                
                  <Accordion>
                    <Accordion.Title as='h3' active={true} index={3} onClick={this.handleClick}>
                      What is your company's refund policy?
                    </Accordion.Title>
                    <Accordion.Content active={true}>
                      <p>
                        We have a very fair 100% money back guarantee policy that fairly resolves all the disputed and questionable cases. You will certainly get your money back if there were any violations from our side.
                      </p>
                    </Accordion.Content>
                  </Accordion> 
                  
                
                
                  <Accordion>
                    <Accordion.Title as='h3' active={true} index={4} onClick={this.handleClick}>
                      How will you get my information?
                    </Accordion.Title>
                    <Accordion.Content active={true}>
                      <p>
                        Our resume-writing process is collaborative between the writer and the client. We use your old resume as a primary source of information. If you don’t have a resume, don’t worry, your writer will send you a questionnaire that will provide all the information that we need to get started. 
                      </p>
                      <p>
                        Once this has been provided, your new resume will be delivered to you in about a week. Then, you'll have another week to provide feedback to your writer, with unlimited rounds of revisions. The process typically takes one to two weeks.
                      </p>
                    </Accordion.Content>
                  </Accordion>
                    
                </Grid>

              </Grid.Column>

          </Grid>
          </Fade>
        </div>
      </Grid>
    )
  }
}

export default Faq