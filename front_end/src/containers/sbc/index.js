import React, { Component } from 'react';
import {Menu, Loader, Header, Icon, Divider } from 'semantic-ui-react'
import SBCTab from './SBCTab'
import { Route, Redirect } from 'react-router'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import ReimbursementTab from './ReimbursementProcess'



const panes = [
    {
        pane: <ReimbursementTab/>,
        key: 'reimbursement'
    },
]

const ResourcesTab = (props) => {
    const tabContent = panes.filter(tab => tab.key === props.match.params.id).pop()
    const hasTab = (tabContent != null)
    var content = <SBCTab />
    if (hasTab) {
        content = tabContent.pane
    }
    return (
        <div>
            {content}
        </div>
    )
    // <Tab menu={{ color: 'red', attached: false, tabular: false }} renderActiveOnly={false} defaultActiveIndex={-1} panes={panes}/>

}

// const mapDispatchToProps = dispatch => bindActionCreators({
//     selectedTabItem: (item) => push(item)
// }, dispatch)

class SBC extends Component {
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
        const {loading} = this.state
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
            console.log(match)
            content = <div><Route path={`${match.url}/:id`} component={(props, panes) => <ResourcesTab {...props} />}/>
            <Route exact path={match.url} render={() => (
                <Redirect to={`${match.url}/home`}/>
            )}/>
            </div>
        }
        return (
            <div>
                <div className="App-header">
                    <Header textAlign='center' size='huge'>SBC</Header>
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
)(SBC)
