/* eslint-disable no-script-url */
/* eslint-disable react/jsx-fragments */
/* eslint-disable react/no-unused-state */
import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {
    DropdownToggle, DropdownMenu, Button, Media,
    UncontrolledTooltip, UncontrolledButtonDropdown, DropdownItem, NavLink
} from 'reactstrap';
import {
    toast,
    Bounce
} from 'react-toastify';


import {
    faCalendarAlt,
    faAngleDown,
    faInfo,
    faExchangeAlt,
    faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
;
import userActions from '../actions/user';
import history from '../helpers/history';
import profileImg from '../images/profile.png';

class UserBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
        };
        this.handleLogout = this.handleLogout.bind(this);
    }

    notify = () => {
        this.toastId = toast("You don't have any new items in your calendar for today! Go out and play!", {
        transition: Bounce,
        closeButton: true,
        autoClose: 3000,
        position: 'top-center',
        type: 'success'
    })};

    handleLogout(e){
        e.preventDefault();
        const { logout } = this.props;
        logout();
        history.push("/login");
    }

    render() {
        const { data } = this.props;
        return (
            <Fragment>
                <div className="header-btn-lg pr-0">
                    <div className="widget-content p-0">
                        <div className="widget-content-wrapper">
                            <div className="widget-content-left">
                                <UncontrolledButtonDropdown>
                                    <DropdownToggle color="link" className="p-0">
                                        <Media object width={32} height={32} className="rounded-circle" src={data.user.userImg? data.user.userImg: profileImg} alt=""/>
                                        <FontAwesomeIcon className="ml-2 opacity-8" icon={faAngleDown}/>
                                    </DropdownToggle>
                                    {data &&
                                    <DropdownMenu right className="rm-pointers dropdown-menu-lg">
                                
                                        <NavLink href="/info">
                                            <DropdownItem eventKey="1">Thông tin tài khoản
                                                <FontAwesomeIcon className="mr-2 ml-2" icon={faInfo}/>
                                            </DropdownItem>
                                        </NavLink>
                                        {data.user.typeAccount === 'Normal' &&
                                        <NavLink href="/change-password">
                                            <DropdownItem eventKey="2">Đổi mật khẩu
                                                <FontAwesomeIcon className="mr-2 ml-2" icon={faExchangeAlt}/>
                                            </DropdownItem>
                                        </NavLink>
                                        }
                                      
                                        <NavLink>
                                            <DropdownItem onClick={this.handleLogout} eventKey="3">Đăng xuất
                                                <FontAwesomeIcon className="mr-2 ml-2" icon={faSignOutAlt}/>
                                            </DropdownItem>
                                        </NavLink>
                                    </DropdownMenu>   
                                    }
                                </UncontrolledButtonDropdown>
                            </div>
                            <div className="widget-content-left  ml-3 header-user-info">
                                {data &&
                                <div>
                                    <div className="widget-heading">
                                        {data.user.fullName}
                                    </div>
                                    <div className="widget-subheading">
                                        {data.user.role}
                                    </div>
                                </div>
                                }
                            </div>

                            <div className="widget-content-right header-user-info ml-3">
                                <Button className="btn-shadow p-1" size="sm" onClick={this.notify2} color="info"
                                        id="Tooltip-1">
                                    <FontAwesomeIcon className="mr-2 ml-2" icon={faCalendarAlt}/>
                                </Button>
                                <UncontrolledTooltip placement="bottom" target='Tooltip-1'>
                                    Click for Toastify Notifications!
                                </UncontrolledTooltip>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}
const mapStateToProps = state => ({
    data: state.login.data
});

const actionCreator = {
    logout: userActions.logout
}

export default connect(mapStateToProps, actionCreator)(UserBox);