import React from 'react'
import { Route, Link, Redirect } from 'react-router'

/* containers */
import Home from '../containers/home'
import About from '../containers/about'
import Contact from '../containers/contact'
import Calendar from '../containers/calendar'
import Resources from '../containers/resources'
import Apply from '../containers/apply'
import Members from '../containers/members'
import Suggestions from '../containers/suggestions'

const routes = [
  { path: '/',
    exact: true,
    sidebar: () => <div>Home</div>,
    main: () => <Home/>
  },
  { path: '/about',
    exact: false,
    sidebar: () => <div>About</div>,
    main: (props) => <About {...props}/>
  },
  { path: '/resources',
    exact: false,
    sidebar: () => <div>Resources</div>,
    main: (props) => <Resources {...props}/>
  },
  { path: '/calendar',
    exact: false,
    sidebar: () => <div>Calendar</div>,
    main: (props) => <Calendar {...props}/>
  },
  { path: '/members',
    exact: false,
    sidebar: () => <div>Members</div>,
    main: (props) => <Members {...props}/>
  },
  { path: '/contact',
    exact: false,
    sidebar: () => <div>Contact</div>,
    main: (props) => <Contact {...props}/>
  },
  { path: '/suggestions',
    exact: false,
    sidebar: () => <div>Suggestions</div>,
    main: (props) => <Suggestions {...props}/>
  },
  { path: '/apply',
    exact: false,
    sidebar: () => <div>Apply</div>,
    main: (props) => <Apply {...props} />
  }
]

const Routes = () => {
    return (
        <div className="App">
            {routes.map((route, index) => (
                <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    component={route.main}
                />
            ))}
        </div>
    );
}

export default Routes
