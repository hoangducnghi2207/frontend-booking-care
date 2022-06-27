import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss'
import { getAllUsers } from '../../services/userService'
class UserManage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrUsers: []
        }
    }
    state = {

    }

    async componentDidMount() {
        let respond = await getAllUsers('ALL')
        console.log(19, respond);
        if (respond && respond.errCode == 0) {
            this.setState({
                arrUsers: respond.users
            }, () => {
                console.log('check state user', this.state.arrUsers);
            })
        }
    }
    //life cycle
    //1:run component -> run constructor để init state
    //2: chay vao ham Didmount ( gắn giá trị cho state)
    //3: Chạy vào hàm render


    render() {
        console.log('check render', this.state);
        let arrUsers = this.state.arrUsers
        return (
            <div className="users-container">
                <div className='tittle text-center'>Manage user with Nghi</div>
                <div className='users-table mt-3 mx-1'>
                    <table id="customers">
                        <tr>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                       
                            {arrUsers && arrUsers.map((item, index) => {
                                return (
                                    <tr>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                           <button className='btn-edit'><i class="fas fa-pencil-alt"></i></button>
                                           <button className='btn-delete'><i className="fas fa-trash"></i></button>

                                        </td>
                                    </tr>
                                )
                            })
                            }
                       

                    </table>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
