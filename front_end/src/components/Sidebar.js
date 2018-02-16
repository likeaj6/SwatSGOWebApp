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
        subMenu: [
            // {name: 'news', to: '/news', icon: 'newspaper', content: 'News'},
            {name: 'resources', to: '/resources', icon: 'book', content: 'Resources'},
            {name: 'apply', to: '/apply', icon: 'wordpress forms', content: 'Apply'},
            {name: 'about', to: '/about', icon: 'info', content: 'About'}
        ] },
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
        this.mapMenuItemsToComponent = this.mapMenuItemsToComponent.bind(this);
        this.state = { isMobile: window.innerWidth <= 760}
    }

    componentDidMount() {
        window.addEventListener("resize", this.resize.bind(this));
        this.resize();
    }

    resize() {
        this.setState({isMobile: window.innerWidth <= 760});
    }

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
        const {isMobile} = this.state

        return (
            <Menu className="Sidebar" fixed={isMobile ? "top":"left"} vertical={!isMobile} color="red" stackable inverted size="small" items={ menuItems.map(this.mapMenuItemsToComponent)}>
            </Menu>
        );
    }
}
export default connect(
  null,
  mapDispatchToProps
)(Sidebar)
