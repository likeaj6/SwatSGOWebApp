import React, { Component } from 'react';
import text from './text'
import links from './links'
import { Segment, List, Label, Loader, Header, Message, Image, Popup, Icon, Button, Divider } from 'semantic-ui-react'


class FundingTab extends Component {
    render() {
        return (
            <div>
            <Header content='Funding Sources' textAlign='center' />
            </div>
        )
    }
}

export default FundingTab
