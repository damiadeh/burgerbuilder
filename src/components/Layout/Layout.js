import React, {Component} from 'react';

import Aux from '../Base';
import './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }
    SideDrawerToggler = () => {
        this.setState({showSideDrawer: false});
    }

    sideDrawerTogglerHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer};
        } );
    }


    render() {
        return (
            <Aux>
                <Toolbar drawerToggleClicked={this.sideDrawerTogglerHandler} />
                <SideDrawer open={this.state.showSideDrawer} closed={this.SideDrawerToggler} />
                <main className="Content">
                    {this.props.children}
                </main>
            </Aux>
        );
    }
} 

export default Layout;