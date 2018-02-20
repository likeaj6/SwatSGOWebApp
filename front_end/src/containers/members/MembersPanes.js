import React, { Component } from 'react';
import { Tab, Menu, Accordion, Card, Modal, Segment, Embed, List, Label, Loader, Header, Message, Image, Popup, Icon, Container, Button, Divider } from 'semantic-ui-react'
import text from './text'
import members from './members'


const ExecboardTab = () => {
    return (
        <Tab.Pane>
            <Header size='small' block icon textAlign='center'>
                <Icon name='address book outline' circular />
                Executive Board
            </Header>
            <br/>
                <Card.Group items={ExecMembersCardItems}/>
            <br/>
         </Tab.Pane>
    );
}
const SenateTab = () => {
    return (
        <Tab.Pane>
            <Header size='small' block icon textAlign='center'>
                <Icon name='address book outline' circular />
                Senate
            </Header>
            <br/>
            <Header content='At-Large Senators'/>
            <Card.Group items={SenateAtLargeCardItems}/>
            <Divider/>
            <Header content='2018 Senators'/>
            <Card.Group items={Senate2018CardItems}/>
            <Divider/>
            <Header content='2019 Senators'/>
            <Card.Group items={Senate2019CardItems}/>
            <Divider/>
            <Header content='2020 Senators'/>
            <Card.Group items={Senate2020CardItems}/>
            <Divider/>
            <Header content='2021 Senators'/>
            <Card.Group items={Senate2021CardItems}/>
            <Divider/>
            <br/>
         </Tab.Pane>
    );
}

const CommitteesTab = () => {
    return (
        <Tab.Pane>
            <Header size='small' block icon textAlign='center'>
                <Icon name='address book outline' circular />
                Committee Members
            </Header>
            <br/>

            <Card.Group/>

            <br/>
         </Tab.Pane>
    );
}

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const images = importAll(require.context('./assets/', false, /\.(png|jpe?g|svg)$/));

function mapMembersToCards(member, index) {
    const name = member.name
    const committee = member.committee
    return {
        raised: true,
        color: 'red',
        extra: <div><Button href={'mailto:' + member.email} fluid content='Contact'/></div>,
        key: member+index,
        description: <Card.Description textAlign='center' content={member.title}/>,
        image: <Image src={images[committee+'.jpg']}/>,
        header: <Header textAlign='center'>{name}<Divider/></Header>,
    }
}

const ExecMembersCardItems = members.Execboard.map(mapMembersToCards)
const SenateAtLargeCardItems = members.Senate.AtLarge.map(mapMembersToCards)
const Senate2018CardItems = members.Senate.Seniors.map(mapMembersToCards)
const Senate2019CardItems = members.Senate.Juniors.map(mapMembersToCards)
const Senate2020CardItems = members.Senate.Sophomores.map(mapMembersToCards)
const Senate2021CardItems = members.Senate.Freshmen.map(mapMembersToCards)


const CommitteesPanel = [
    {title: 'Student Committees',  index: 1, content: {
        content:(
            <div>
                <Header size='small' block icon textAlign='center' children={text.StudentCommitteesDescription}/>
                <Card.Group itemsPerRow={4} textAlign='center' stackable doubling/>
            </div>
        ),
        key: 'student',

    }},
    {title: 'College Committees',  index: 2, content: {
        content:(
            <div>
                <Header size='small' block icon textAlign='center' children={text.CollegeCommitteesDescriptions}/>
                <Card.Group itemsPerRow={3} textAlign='center' stackable doubling/>
            </div>
        ),
        key: 'college',

    }}
]

export {
    ExecboardTab,
    SenateTab,
    CommitteesTab
}
