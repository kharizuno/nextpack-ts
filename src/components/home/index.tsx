import { withRouter } from 'next/router'

import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actPost from '../../redux/actions/post';

interface DataProps {
	router: any;
}

interface DataState {}

export class Home extends Component<DataProps, DataState> {
    constructor(props: any) {
        super(props);

        this.state = {

        }
    }

    render() {
        console.log(this.props);

        return (
            <div>Home</div>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        postList: state.post.postList
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
		actPost: bindActionCreators(actPost, dispatch)
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));