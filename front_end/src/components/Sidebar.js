import React, { Component } from 'react'
import logo from './logo.svg';
// import ActionCreators from '../actions'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'

import { Dropdown, Icon, Input, Menu, Image } from 'semantic-ui-react'

const menuItems = [
    {name: 'logo', to:'/', image: logo, header: false, icon: null, content: null},
    {name: 'home', to: '/', header: true, icon: 'home', content: 'Home',
        subMenu: [{name: 'news', to: '/news', icon: 'newspaper', content: 'News'},
        {name: 'apply', to: '/apply', icon: 'wordpress forms', content: 'Apply'},
        {name: 'about', to: '/about', icon: 'info', content: 'About'}] },
    {name: 'calendar', to: '/calendar', header: true, icon: 'calendar', content: 'Calendar'},
    {name: 'members', to: '/members', header: true, icon: 'users', content: 'Members'},
    {name: 'contact', to: '/contact', header: true, icon: 'talk outline', content: 'Contact'},
    {name: 'suggestions', to: '/suggestions', header: true, icon: 'inbox' , content: 'Suggestions Box'}
]


const SidebarItem = props => {
    return (
        <Menu.Item header={props.header} name={props.name} active={props.activeItem === props.name || props.subMenuNames.indexOf(props.activeItem) > -1} {...props.clickable ? { onClick:props.onClick}:{} }>
            {props.image? <Image src={props.image}/>: null}
            {props.icon? <Icon name={props.icon}/>: null}
            {props.content}
            {props.children}
        </Menu.Item>
    );
}


const mapDispatchToProps = dispatch => bindActionCreators({
    selectedSideMenuItem: (to) => push('/' + to)
}, dispatch)

class Sidebar extends Component {

    constructor(props) {
        super(props);
        this.mapMenuItemsToComponent = this.mapMenuItemsToComponent.bind(this);
    }
    state = { activeItem : 'news'}

    handleItemClick = (e, { name}) => {
        const path = (name === 'home') ? '': name
        this.props.selectedSideMenuItem(path)
        e.stopPropagation();
        this.setState({ activeItem: name })
        // alert(name)
    }

    mapMenuItemsToComponent(menuItem, index) {
        const { name, header, image, icon, content, subMenu, to } = menuItem
        const { activeItem } = this.state
        var subMenuNames = []
        var children = null
        if (subMenu) {
            subMenuNames = subMenu.map(item => item.name)
            children = <Menu.Menu children={subMenu.map(this.mapMenuItemsToComponent)}></Menu.Menu>;
        }
        return (
            <SidebarItem as={Link} key={index} to={to} image={image} header={header} key={index} icon={icon} index={index} activeItem={this.state.activeItem} clickable={(image == null)} onClick={this.handleItemClick} name={name} subMenuNames={subMenuNames} content={content} children={children}/>
        );
    }


    // function mapDispatchToProps(dispatch) {
    //     return {
    //         selectedSidebarItem: (index) =>   dispatch(ActionCreators.setSelectedSidebarItem(index))
    //     }
    // }

    render() {
        const { activeItem } = this.state
        return (
            <Menu fixed="left" vertical color="red" size="medium" style={{ width: '15%',}} items={ menuItems.map(this.mapMenuItemsToComponent)}>
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
export default connect(
  null,
  mapDispatchToProps
)(Sidebar)
