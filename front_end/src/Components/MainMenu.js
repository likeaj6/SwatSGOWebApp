import React, { Component } from 'react'
import logo from './logo.svg';
import { Menu, Input, Button, Icon, Image} from 'semantic-ui-react'

export default class MainMenu extends Component {
    state = { activeItem: 'home'}

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state

        return (
            <Menu pointing secondary stackable color="red" size="massive">
            <Menu.Item header>
            <img src={logo}></img>
            </Menu.Item>

            <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
            >
            Home
            </Menu.Item>

            <Menu.Item
            name='members'
            active={activeItem === 'members'}
            onClick={this.handleItemClick}
            >
            Members
            </Menu.Item>

            <Menu.Item
            name='resources'
            active={activeItem === 'resources'}
            onClick={this.handleItemClick}
            >
            Resources
            </Menu.Item>

            <Menu.Item position="right">
            <Button>Message SGO</Button>
            </Menu.Item>

            </Menu>
        )
    }
}
