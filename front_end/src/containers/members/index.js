import React, { Component } from 'react';
import {Menu, Loader, Header, Icon, Divider } from 'semantic-ui-react'
import { ExecboardTab, SenateTab, CommitteesTab } from './MembersPanes'
import { Route, Redirect } from 'react-router'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

const panes = [
    {
        menuItem: <Menu.Item as={NavLink} to='/members/execboard' key='structure' ><Icon name='university'/>Executive Board</Menu.Item>,
        key: 'execboard',
        pane: <ExecboardTab/>
    },
    {
        menuItem: <Menu.Item as={NavLink} to='/members/senate' key='legislation'><Icon name='book'/>Senate</Menu.Item>,
        key: 'senate',
        pane: <SenateTab/>
    },
    // {
    //     menuItem: <Menu.Item as={NavLink} to='/members/committees' key='committees'><Icon name='address book outline'/>Committees</Menu.Item>,
    //     key: 'committees',
    //     pane: <CommitteesTab/>
    // },
]

const MembersTab = (props) => {
    const tabContent = panes.filter(tab => tab.key === props.match.params.id).pop()
    const hasTab = (tabContent != null)
    return (
        <div>
            <Menu color='red' pointing>
                {panes.map((tab, index) => {
                    return tab.menuItem
                })}
            </Menu>
            {hasTab ? tabContent.pane: <Header>This Link Does Not Exist!</Header>}
        </div>
    )

}


class Members extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        }
    }

    componentDidMount() {
        // fetch('/')
        setTimeout(() => {
            this.setState({
                loading: false
            })
        }, 10)
    }

    render() {
        const {loading, feed} = this.state
        const {match} = this.props
        // console.log(this.panes)
        // const tabPanes = panes
        // console.log(ResourcesTab)
        var content;
        if (loading) {
             content = <div><Loader active={loading}>
                <Header>Just one second</Header>
                <p>We are fetching that content for you.</p>
            </Loader></div>
        } else {
            content = <div><Route path={`${match.url}/:id`} component={(props, panes) => <MembersTab {...props} />}/>
            <Route exact path={match.url} render={() => (
                <Redirect to={`${match.url}/execboard`}/>
            )}/>
            </div>
        }
        return (
            <div>
                <div className="App-header">
                    <Header textAlign='center' size='huge'>Members</Header>
                    <Divider/>
                </div>
                <div className="App-intro">
                    {content}
                </div>

            </div>
        );
    }

}

export default Members
