import React, { Component } from 'react'
import logo from './logo.svg';

import { Dropdown, Icon, Input, Menu, Image } from 'semantic-ui-react'

export default class MenuExampleSubMenu extends Component {
    state = { activeItem : 'news'}

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state

        return (
            <Menu fixed="left" vertical color="red" size="large">
                <Menu.Item>
                <Image src={logo}></Image>
                </Menu.Item>

                <Menu.Item>
                <Input placeholder='Search...' icon="search"/>
                </Menu.Item>

                <Menu.Item header name='home' active={activeItem === 'news' || activeItem === 'apply' || activeItem === 'about'}>
                    <Icon name="home"/>
                    Home

                    <Menu.Menu>
                        <Menu.Item name='news' active={activeItem === 'news'} onClick={this.handleItemClick}>
                        <Icon name="newspaper"/>
                            News
                        </Menu.Item>
                        <Menu.Item name='apply' active={activeItem === 'apply'} onClick={this.handleItemClick}>
                        <Icon name='wordpress forms' />
                            Apply
                        </Menu.Item>
                        <Menu.Item name='about' active={activeItem === 'about'} onClick={this.handleItemClick}>
                        <Icon name="info"/>
                            About
                        </Menu.Item>
                    </Menu.Menu>
                </Menu.Item>

            <Menu.Item header name='calendar' active={activeItem === 'calendar'} onClick={this.handleItemClick}>
            <Icon name='calendar' />
            Calendar
            </Menu.Item>

            <Menu.Item header name='members' active={activeItem === 'members'} onClick={this.handleItemClick}>
            <Icon name='users' />
            Members
            </Menu.Item>


            <Menu.Item header name='message' active={activeItem === 'message'} onClick={this.handleItemClick}>
            <Icon name='talk outline' />
            Contact
            </Menu.Item>
            <Menu.Item header name='suggestions' active={activeItem === 'suggestions'} onClick={this.handleItemClick}>
            <Icon name="inbox"/>
            Suggestions Box
            </Menu.Item>

            <Dropdown item text='More'>
                <Dropdown.Menu>
                <Dropdown.Item icon='edit' text='Edit Profile' />
                <Dropdown.Item icon='globe' text='Choose Language' />
                <Dropdown.Item icon='settings' text='Account Settings' />
                </Dropdown.Menu>
            </Dropdown>
            </Menu>
        )
    }
}
