import React, { Component } from 'react';
import {Menu, List, Loader, Header, Icon, Divider, Container } from 'semantic-ui-react'
import { GroupsTab, BudgetingTab, EventPlanningTab } from './tabPanes'
import { Route, Redirect } from 'react-router'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'




const panes = [
        {
        menuItem: <Menu.Item as={NavLink} to='/resources/student-groups' key='student-groups' ><Icon name='university'/>Student Groups</Menu.Item>,
        pane: <GroupsTab/>,
        key: 'student-groups'
        },
        {
        menuItem: <Menu.Item as={NavLink} to='/resources/budgeting' key='budgeting'><Icon name='book'/>Budgeting</Menu.Item>,
        pane: <BudgetingTab/>,
        key: 'budgeting'
        },
        {
        menuItem: <Menu.Item as={NavLink} to='/resources/event-planning' key='event-planning'><Icon name='idea'/>Event Planning</Menu.Item>,
        pane: <EventPlanningTab/>,
        key: 'event-planning'
    },
]

const ResourcesTab = (props) => {
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
    // <Tab menu={{ color: 'red', attached: false, tabular: false }} renderActiveOnly={false} defaultActiveIndex={-1} panes={panes}/>

}

// const mapDispatchToProps = dispatch => bindActionCreators({
//     selectedTabItem: (item) => push(item)
// }, dispatch)

class Resources extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        }
    }

    componentDidMount() {
        fetch('/')
        setTimeout(() => {
            this.setState({
                loading: false
            })
        }, 300)
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
            content = <div><Route path={`${match.url}/:id`} component={(props, panes) => <ResourcesTab {...props} />}/>
            <Route exact path={match.url} render={() => (
                <Redirect to={`${match.url}/student-groups`}/>
            )}/>
            </div>
        }
        return (
            <div>
                <div className="App-header">
                    <Header size='huge'>Resources</Header>
                    <Divider/>
                </div>
                <div className="App-intro">
                    {content}
                </div>

            </div>
        );
    }
}

export default connect(
    null,
)(Resources)
