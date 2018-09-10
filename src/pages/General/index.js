import React, {Component} from 'react'
import './style.css'
import ReactPaginate from 'react-paginate';
import {Link} from 'react-router-dom'
import Loader from '../../components/Loader'
import userlogo from '../../u_1.png'
import cookie from 'react-cookies'

class Profile extends Component {
    state = {
        data: [],
        offset: 0,
        activeLoader: false
    }


    componentWillMount () {
        this.setState({activeLoader: true})
        if (cookie.load('page')) {
            this.setState({
                offset: Math.ceil(cookie.load('page') * 5)
            })
        }
    }

    componentDidMount () {
        this.loadUserFromServer()
    }

    loadUserFromServer() {
        if (cookie.load('page')) {
            this.setState({
                offset: Math.ceil(cookie.load('page') * 5)
            })
        }
        fetch ('http://dev.frevend.com/json/users.json',
            {
                method: 'GET'
            }).then(res => {
            return res.json()
        }).then(response => {
            this.setState({
                data: response.users.slice(this.state.offset, this.state.offset + 5),
                activeLoader: false,
                pageCount: Math.ceil(response.users.length / 5)
            })
        })
    }

    handlePageClick = (data) => {
        let selected = data.selected
        cookie.save('page', selected, { path: '/' })
        let offset = Math.ceil(selected * 5)

        this.setState({offset: offset}, () => {
            this.loadUserFromServer()
        })
    }

    render () {
        const {data} = this.state

        return (
            <div>
                <div className="blog">
                    {this.state.activeLoader && <Loader/>}
                    {
                        data.map((item, index) => {
                            return (
                                <a
                                    className="itemBlock"
                                    key={index}
                                >
                                    <img src={userlogo} alt=""/>
                                    <br/>
                                    <div className="textBlock">
                                        {item.name} {item.surname}
                                        <br/>
                                    </div>
                                    <button className="button">Далі</button>

                                </a>
                            )
                        })
                    }
                </div>

                <ReactPaginate previousLabel={"<"}
                               nextLabel={">"}
                               breakLabel={<a href="">...</a>}
                               breakClassName={"break-me"}
                               pageCount={this.state.pageCount}
                               marginPagesDisplayed={2}
                               pageRangeDisplayed={5}
                               onPageChange={this.handlePageClick}
                               containerClassName={"pagination"}
                               subContainerClassName={"pages pagination"}
                               activeClassName={"active"}
                               initialPage = {this.state.offset/5}/>
            </div>
        )
    }
}


export default Profile