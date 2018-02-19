import React, { Component } from 'react';
import { Tab, Menu, Accordion, Card, Modal, Segment, Embed, List, Label, Loader, Header, Message, Image, Popup, Icon, Container, Button, Divider } from 'semantic-ui-react'
import text from './text'
import committees from './committees'

const academic = require('./assets/academic.png');

const StructureTab = () => {
    return (
        <Tab.Pane>
            <Header size='small' block icon textAlign='center'>
                <Icon name='university' circular />
                {text.MissionStatement}
            </Header>
            <Divider/>
            <Header size='small' children={text.SGOIntro}/>
            <br/>
                <Accordion defaultActiveIndex={0} exclusive={false} fluid styled panels={StructurePanel}/>
            <br/>
         </Tab.Pane>
    );
}

const LegislationTab = () => {
    return (
        <Tab.Pane>
            <Header size='small' block icon textAlign='center'>
                <Icon name='book' circular />
                {text.LegislationDescription}
            </Header>
            <br/>
                <Accordion defaultActiveIndex={0} exclusive={false} fluid styled panels={LegislationPanel}/>
            <br/>
         </Tab.Pane>
    );
}
const CommitteesTab = () => {
    return (
        <Tab.Pane>
            <Message negative header='Coming Soon' content='Application links for Committees are coming soon!'/>
            <Header size='small' block icon textAlign='center'>
                <Icon name='address book outline' circular />
                SGO Committees
            </Header>
            <br/>

            <Accordion defaultActiveIndex={0} exclusive={false} fluid styled panels={CommitteesPanel}/>

            <br/>
         </Tab.Pane>
    );
}

const ExecSegment = () => {
    return (
        <div>
            <Segment raised color='red' children={text.ExecboardDescription}/>
            <Segment raised color='grey' children={
                <div>
                    {text.ExecboardStructure1}
                    <Segment basic children={<List animated bulleted color='red' items={text.ExecboardPositions}/>}/>
                    {text.ExecboardStructure2}
                </div>
            }/>

        </div>
    );
}

const SenateSegment = () => {
    return (
        <div>
            <Segment raised color='red' children={text.SenateDescription}/>
            <Segment raised color='grey' children={
                <div>
                    {text.SenateStructure1}
                    <Segment basic children={
                        <List animated bulleted color='red'>
                            <List.Item>
                                {text.SenatePositions1[0]}
                                <List items={text.SenatePositions2}>
                                </List>
                            </List.Item>
                            <List.Item>
                                {text.SenatePositions1[1]}
                            </List.Item>
                        </List>
                    }/>
                    {text.SenateStructure2}
                </div>
            }/>

        </div>
    );
}


const StructurePanel = [
    {title: 'Executive Board', index: 0, content: {
        content:(
            <ExecSegment/>
        ),
        key: 'exec2',
    }},
    {title: 'Senate', index: 1, content: {
        content:(
            <SenateSegment/>
        ),
        key: 'senate2',

    }},
]

const ConstitutionSegment = () => {
    return (
        <div>
            <Segment raised color='red' children={text.ConstitutionDescription}/>
            <Modal closeIcon scrolling size='fullscreen' trigger={<Button color='red' size='big'>View</Button>}>
                <Modal.Header>View Constitution</Modal.Header>
                <Modal.Content style={{height: '100%', width: '100%', margin: 'auto'}}>
                    <iframe width='100%' height="550" src="https://docs.google.com/document/d/e/2PACX-1vRi2LzZmmd9e1Z8Z-RxDZ6w-QKilKSyaZhMVqOyCl9Q2PXZt7Hnbh2WIDY-Vi5rbVVMASmYCb52zhKj/pub?embedded=true"></iframe>
                </Modal.Content>
            </Modal>

        </div>
    );
}

const BiasResponseSegment = () => {
    return (
        <div>
            <Segment raised color='red' children={text.BiasResponseDescription}/>
            <Modal closeIcon scrolling size='fullscreen' trigger={<Button color='red' size='big'>View</Button>}>
                <Modal.Header>View Bias Response</Modal.Header>
                <Modal.Content style={{height: '100%', width: '100%', margin: 'auto'}}>
                    <iframe width='100%' height="550" src="https://docs.google.com/document/d/e/2PACX-1vQEX9pvaCo-hCFmBXOT0BS9FRmRhTCCCISajy3NzdfXrcHTkYfmqt-olw3Lyck1URqgN-pf9jT4gNHG/pub?embedded=true"></iframe>
                </Modal.Content>
            </Modal>
        </div>
    );
}

const LegislationPanel = [
    {title: 'Constitution',  index: 0, content: {
        content:(
            <ConstitutionSegment/>
        ),
        key: 'exec2',
    }},
    {title: 'Bias Response',  index: 1, content: {
        content:(
            <BiasResponseSegment/>
        ),
        key: 'senate2',

    }},
]

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const images = importAll(require.context('./assets/', false, /\.(png|jpe?g|svg)$/));

function mapCommitteesToCards(committee, index) {
    const name = committee.name
    return {
        raised: true,
        color: 'red',
        extra: <Popup trigger={<div><Button disabled fluid content='Apply'/></div>} content='Currently not accepting applications'/>,
        key: name,
        header: <Header textAlign='center'>{committee.header}<Divider/></Header>,
        description: <Card.Description textAlign='center' style={{color: 'grey', fontSize: '12px', }} content={text.Committees[name].description}/>,
        image: <Image src={images[name+'.png']}/>,
    }
}

const StandingCommitteeCardItems = committees.standing.map(mapCommitteesToCards)
const StudentCommitteeCardItems = committees.student.map(mapCommitteesToCards)
const CollegeCommitteeCardItems = committees.college.map(mapCommitteesToCards)


const CommitteesPanel = [
    {title: 'Standing Committees',  index: 0, content: {
        content:(
            <div>
                <Header size='small' block icon textAlign='center' children={text.StandingCommitteesDescription}/>
                <Card.Group itemsPerRow={3} textAlign='center' stackable doubling items={StandingCommitteeCardItems}/>
            </div>
        ),
        key: 'standing',
    }},
    {title: 'Student Committees',  index: 1, content: {
        content:(
            <div>
                <Header size='small' block icon textAlign='center' children={text.StudentCommitteesDescription}/>
                <Card.Group itemsPerRow={4} textAlign='center' stackable doubling items={StudentCommitteeCardItems}/>
            </div>
        ),
        key: 'student',

    }},
    {title: 'College Committees',  index: 2, content: {
        content:(
            <div>
                <Header size='small' block icon textAlign='center' children={text.CollegeCommitteesDescriptions}/>
                <Card.Group itemsPerRow={3} textAlign='center' stackable doubling items={CollegeCommitteeCardItems}/>
            </div>
        ),
        key: 'college',

    }}
]


export {
    StructureTab, LegislationTab, CommitteesTab
}
