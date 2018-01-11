import React, { Component } from 'react'
import logo from '../logo_transparent.svg';
// import ActionCreators from '../action
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { NavLink, Link} from 'react-router-dom'

import { Dropdown, Icon, Input, Menu, Image } from 'semantic-ui-react'

const menuItems = [
    {name: 'logo', to:'/', exact: true, image: logo, header: false, icon: null, content: null},
    {name: 'home', to: '/', exact: true, header: true, icon: 'home', content: 'Home',
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
        <Menu.Item as={(props.clickable) ? NavLink: Link} exact={(!props.activeHome) && props.name==='home'} to={props.to} header={props.header} name={props.name} >
            {props.image? <Image src={props.image}/>: null}
            {props.icon? <Icon size='large' name={props.icon}/>: null}
            {props.content}
            {props.children}
        </Menu.Item>
    );
}


const mapDispatchToProps = dispatch => bindActionCreators({
    selectedSidebarItem: (to) => {
        push('/' + to)
    }
}, dispatch)

class Sidebar extends Component {

    constructor(props) {
        super(props);
        // this.state = { activeItem: 'home'}
        this.mapMenuItemsToComponent = this.mapMenuItemsToComponent.bind(this);
    }

    // componentWillReceiveProps(nextProps) {
    //    // alert(this.props.activeItem)
    //    this.setState({ activeItem: nextProps.activeItem })
    //
    // }

    handleItemClick = (e, { name}) => {
        const path = (name === 'home') ? '': name
        this.props.selectedSidebarItem(path)
        this.setState({ activeItem: name})
        // e.stopPropagation();
    }

    mapMenuItemsToComponent(menuItem, index) {
        const { name, header, image, strict, icon, exact, content, subMenu, to } = menuItem

        var currentLink = this.props.path.split('/')
        var activeHome = false
        var subMenuNames = []

        var children = null
        if (subMenu) {
            subMenuNames = subMenu.map(item => item.name)
            activeHome = currentLink.filter((n) => subMenuNames.includes(n)).length != 0 ? true:false
            children = <Menu.Menu children={subMenu.map(this.mapMenuItemsToComponent)}></Menu.Menu>;
        }
        return (
            // <SidebarItem key={index} strict={strict} exact={exact} to={to} image={image} header={header} icon={icon} index={index} clickable={(image == null)} onClick={this.handleItemClick} name={name} subMenuNames={subMenuNames} content={content} children={children}/>
            <SidebarItem key={index} {...menuItem} activeHome={activeHome} subMenuNames={subMenuNames} children={children} clickable={(image == null) } onClick={this.handleItemClick}/>
        );
    }


    // function mapDispatchToProps(dispatch) {
    //     return {
    //         selectedSidebarItem: (index) =>   dispatch(ActionCreators.setSelectedSidebarItem(index))
    //     }
    // }

    render() {
        return (
            <Menu fixed="left" vertical color="red" inverted size="small" style={{ width: '15%',}} items={ menuItems.map(this.mapMenuItemsToComponent)}>
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
