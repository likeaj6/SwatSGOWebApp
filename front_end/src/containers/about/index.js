import React, { Component } from 'react';
import {Menu, List, Loader, Header, Icon, Divider, Container } from 'semantic-ui-react'
import { StructureTab, LegislationTab, CommitteesTab } from './tabPanes'
import { Route, Redirect } from 'react-router'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'




const panes = [
        {
        menuItem: <Menu.Item as={NavLink} to='/about/structure' key='structure' ><Icon name='university'/>Structure</Menu.Item>,
        pane: <StructureTab/>,
        key: 'structure'
        },
        {
        menuItem: <Menu.Item as={NavLink} to='/about/legislation' key='legislation'><Icon name='book'/>Legislation</Menu.Item>,
        pane: <LegislationTab/>,
        key: 'legislation'
        },
        {
        menuItem: <Menu.Item as={NavLink} to='/about/committees' key='committees'><Icon name='address book outline'/>Committees</Menu.Item>,
        pane: <CommitteesTab/>,
        key: 'committees'
    },
]

const AboutTab = (props) => {
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

class About extends Component {
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
        //   .then(res => res.json())
        //   .then(users => this.setState({ users }));
    }

    render() {
        const {loading, feed} = this.state
        const {match} = this.props
        // console.log(this.panes)
        // const tabPanes = panes
        // console.log(AboutTab)
        var content;
        if (loading) {
             content = <div><Loader active={loading}>
                <Header>Just one second</Header>
                <p>We are fetching that content for you.</p>
            </Loader></div>
        } else {
            content = <div><Route path={`${match.url}/:id`} component={(props, panes) => <AboutTab {...props} />}/>
            <Route exact path={match.url} render={() => (
                <Redirect to={`${match.url}/structure`}/>
            )}/>
            </div>
        }
        return (
            <div>
                <div className="App-header">
                    <Header size='huge'>About SGO</Header>
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
)(About)
