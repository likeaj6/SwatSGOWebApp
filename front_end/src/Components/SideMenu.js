import React, { Component } from 'react'
import logo from './logo.svg';

import { Dropdown, Icon, Input, Menu, Image } from 'semantic-ui-react'

const menuItems = [
    {name: 'home', header: true, icon: 'home', content: 'Home',
        subMenu: [{name: 'news', icon: 'newspaper', content: 'News'},
        {name: 'apply', icon: 'wordpress forms', content: 'Apply'},
        {name: 'about', icon: 'info', content: 'About'}] },
    {name: 'calendar', header: true, icon: 'calendar', content: 'Calendar'},
    {name: 'members', header: true, icon: 'users', content: 'Members'},
    {name: 'contact', header: true, icon: 'talk outline', content: 'Contact'},
    {name: 'suggestions box', header: true, icon: 'inbox' , content: 'Suggestions Box'}
]


const SideMenuItem = props => {
    return (
        <Menu.Item header={props.header} name={props.name} active={props.activeItem === props.name} onClick={props.onClick}>
            <Icon name={props.icon}/>
            {props.content}
            {props.children}
        </Menu.Item>
    );
}

export default class SideMenu extends Component {

    constructor(props) {
        super(props);
        this.mapMenuItemsToComponent = this.mapMenuItemsToComponent.bind(this);
    }
    state = { activeItem : 'home'}

    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name })
    }

    mapMenuItemsToComponent(menuItem, index) {
        const { name, header, icon, content, subMenu } = menuItem
        const { activeItem } = this.state
        var children = null
        if (subMenu) {
            children = <Menu.Menu children={subMenu.map(this.mapMenuItemsToComponent)}></Menu.Menu>;
        }
        return <SideMenuItem header={header} key={index} icon={icon} index={index} activeItem={activeItem} onClick={this.handleItemClick} name={name} subMenu={subMenu} content={content} children={children}/>;
    }

    render() {
        const { activeItem } = this.state
        return (
            <Menu fixed="left" vertical color="red" size="large" items={  menuItems.map(this.mapMenuItemsToComponent)}>
            </Menu>
        );
    }
        // return (
            // <Menu fixed="left" vertical color="red" size="large">
            //     <Menu.Item>
            //     <Image src={logo}></Image>
            //     </Menu.Item>
            //
            //     <Menu.Item>
            //     <Input placeholder='Search...' icon="search"/>
            //     </Menu.Item>
            //
            //     <Menu.Item header name='home' active={activeItem === 'news' || activeItem === 'apply' || activeItem === 'about'}>
            //         <Icon name="home"/>
            //         Home
            //
            //         <Menu.Menu>
            //             <Menu.Item name='news' active={activeItem === 'news'} onClick={this.handleItemClick}>
            //             <Icon name="newspaper"/>
            //                 News
            //             </Menu.Item>
            //             <Menu.Item name='apply' active={activeItem === 'apply'} onClick={this.handleItemClick}>
            //             <Icon name='wordpress forms' />
            //                 Apply
            //             </Menu.Item>
            //             <Menu.Item name='about' active={activeItem === 'about'} onClick={this.handleItemClick}>
            //             <Icon name="info"/>
            //                 About
            //             </Menu.Item>
            //         </Menu.Menu>
            //     </Menu.Item>
            //
            // <Menu.Item header name='calendar' active={activeItem === 'calendar'} onClick={this.handleItemClick}>
            // <Icon name='calendar' />
            // Calendar
            // </Menu.Item>
            //
            // <Menu.Item header name='members' active={activeItem === 'members'} onClick={this.handleItemClick}>
            // <Icon name='users' />
            // Members
            // </Menu.Item>
            //
            //
            // <Menu.Item header name='message' active={activeItem === 'message'} onClick={this.handleItemClick}>
            // <Icon name='talk outline' />
            // Contact
            // </Menu.Item>
            // <Menu.Item header name='suggestions' active={activeItem === 'suggestions'} onClick={this.handleItemClick}>
            // <Icon name="inbox"/>
            // Suggestions Box
            // </Menu.Item>
            //
            // <Dropdown item text='More'>
            //     <Dropdown.Menu>
            //     <Dropdown.Item icon='edit' text='Edit Profile' />
            //     <Dropdown.Item icon='globe' text='Choose Language' />
            //     <Dropdown.Item icon='settings' text='Account Settings' />
            //     </Dropdown.Menu>
            // </Dropdown>
            // </Menu>
        // )
    // }
}
