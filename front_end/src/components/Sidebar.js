import React, { Component } from 'react'
import logo from '../logo_transparent.svg';
// import ActionCreators from '../action
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { NavLink, Link} from 'react-router-dom'

import {Icon, Menu, Sidebar, Image, Responsive} from 'semantic-ui-react'

const menuItems = [
    {key:'logo', name: 'logo', color: '#FFFFFF', to:'/', exact: true, image: logo, header: false, icon: null, content: null},
    {key:'home', name: 'home', color: '#FFFFFF', to: '/', exact: true, header: true, icon: 'home', content: 'Home',
        subMenu: [
            // {name: 'news', to: '/news', icon: 'newspaper', content: 'News'},
            {name: 'resources', color:'#F2F6F7', to: '/resources', icon: 'book', content: 'Resources'},
            {name: 'apply', color: '#F2F6F7', to: '/apply', icon: 'wordpress forms', content: 'Apply'},
            {name: 'about', color: '#F2F6F7', to: '/about', icon: 'info', content: 'About'}
        ] },
    {key:'calendar', name: 'calendar', color: '#FFFFFF', to: '/calendar', header: true, icon: 'calendar', content: 'Calendar'},
    {key: 'members', name: 'members', color: '#FFFFFF', to: '/members', header: true, icon: 'users', content: 'Members'},
    {key: 'contact', name: 'contact', color: '#FFFFFF',  to: '/contact', header: true, icon: 'talk outline', content: 'Contact'},
    {key: 'suggestions', name: 'suggestions', color: '#FFFFFF', to: '/suggestions', header: true, icon: 'inbox' , content: 'Suggestions Box'}
]


const SidebarItem = props => {
    return (
        <Menu.Item as={(props.clickable) ? NavLink: Link} exact={(!props.activeHome) && props.name==='home'} to={props.to} header={props.header} link name={props.name} >
            {props.image? <Image src={props.image}/>: null}
            {props.icon? <Icon style={{color: props.color}} size='large' name={props.icon}/>: null}
            <div style={{color: props.color}}>{props.content}</div>
            {props.children}
        </Menu.Item>
    );
}


const mapDispatchToProps = dispatch => bindActionCreators({
    selectedSidebarItem: (to) => {
        push('/' + to)
    }
}, dispatch)




class NavBarMobile extends Component {
    constructor(props) {
        super(props);
        this.mapMenuItemsToComponent = this.mapMenuItemsToComponent.bind(this);
    }
    mapMenuItemsToComponent(menuItem, index) {
        const {subMenu } = menuItem
        menuItem.image = null

        var currentLink = this.props.path.split('/')
        var activeHome = false
        var subMenuNames = []

        var children = null
        if (subMenu) {
            subMenuNames = subMenu.map(item => item.name)
            activeHome = currentLink.filter((n) => subMenuNames.includes(n)).length !== 0 ? true:false
            children = <Menu.Menu children={subMenu.map(this.mapMenuItemsToComponent)}></Menu.Menu>;
        }
        return (
            <SidebarItem key={index} {...menuItem} activeHome={activeHome} subMenuNames={subMenuNames} children={children} onClick={this.handleItemClick}/>
        );
    }
    render() {
        const { children, onPusherClick, onToggle, visible } = this.props
        return (
            <Sidebar.Pushable>
                <Sidebar
                    as={Menu}
                    animation="overlay"
                    icon="labeled"
                    inverted
                    items={menuItems.map(this.mapMenuItemsToComponent)}
                    vertical
                    visible={visible}
                />
                <Sidebar.Pusher
                    color='red'
                    dimmed={visible}
                    onClick={onPusherClick}
                    style={{ minHeight: "100vh" }}
                >
                    <Menu fixed="top" color="red" inverted>
                        <Menu.Item>
                          <Image size="mini" as={NavLink} to='/' alt="logo" src={logo} />
                        </Menu.Item>
                        <Menu.Item onClick={onToggle}>
                        <Icon name="sidebar" />
                        </Menu.Item>
                    </Menu>
                    <div>
                    {children}
                    </div>
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        );
    }
}

class Navbar extends Component {

    constructor(props) {
        super(props);
        this.mapMenuItemsToComponent = this.mapMenuItemsToComponent.bind(this);
        this.state = { isMobile: window.innerWidth <= 760, visible: false
        }
        this.resize = this.resize.bind(this)
    }

    handlePusher = () => {
        const { visible } = this.state;

        if (visible) this.setState({ visible: false });
    };

    handleToggle = () => this.setState({ visible: !this.state.visible });

    componentDidMount() {
        window.addEventListener("resize", this.resize);
        this.resize();
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.resize);
    }

    resize() {
        this.setState({isMobile: window.innerWidth <= 760});
    }

    handleItemClick = (e, { name}) => {
        const path = (name === 'home') ? '': name
        this.props.selectedSidebarItem(path)
        // this.setState({ activeItem: name})
        // e.stopPropagation();
    }

    mapMenuItemsToComponent(menuItem, index) {
        const {image, subMenu } = menuItem

        var currentLink = this.props.path.split('/')
        var activeHome = false
        var subMenuNames = []

        var children = null
        if (subMenu) {
            subMenuNames = subMenu.map(item => item.name)
            activeHome = currentLink.filter((n) => subMenuNames.includes(n)).length !== 0 ? true:false
            children = <Menu.Menu children={subMenu.map(this.mapMenuItemsToComponent)}></Menu.Menu>;
        }
        return (
            <SidebarItem key={index} {...menuItem} activeHome={activeHome} subMenuNames={subMenuNames} children={children} clickable={(image == null) } onClick={this.handleItemClick}/>
        );
    }


    // function mapDispatchToProps(dispatch) {
    //     return {
    //         selectedSidebarItem: (index) =>   dispatch(ActionCreators.setSelectedSidebarItem(index))
    //     }
    // }

    render() {
        const {isMobile, visible} = this.state
        const {children, path} = this.props
        return (
            <div>
                <Responsive {...Responsive.onlyMobile}>
                  <NavBarMobile
                    onPusherClick={this.handlePusher}
                    onToggle={this.handleToggle}
                    visible={visible}
                    path={path}
                  >
                    {children}
                  </NavBarMobile>
                </Responsive>
                <Responsive minWidth={768}>
                    <Menu className="Sidebar" fixed={isMobile ? "top":"left"} vertical={!isMobile} color="red" stackable inverted size="large" items={      menuItems.map(this.mapMenuItemsToComponent)}>
                    </Menu>
                    {children}
                </Responsive>
            </div>
        );
    }
}
export default connect(
  null,
  mapDispatchToProps
)(Navbar)
