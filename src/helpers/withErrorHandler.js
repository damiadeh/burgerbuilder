import React, {Component} from 'react';
import Modal from '../components/Modal/Modal';
import Base from '../components/Base';
//import axios from '../axios-orders';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null,
            shouldShow: false
        }
        componentDidMount (){
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                //console.log("shit mounted");
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error : error, shouldShow : true});
                //console.log("shit eerror");
            });
            // axios.interceptors.request.use(function (response) {
            //     console.log("shit eerrorrr");
            //     return response;
            // }, function (error) {
            //     //catches if the session ended!
            //     this.setState({error : error, shouldShow : true});
            //     console.log("shit eerror");
                
            // });
        }
        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.request.eject(this.resInterceptor);
        }
        errorConfirmHandler = () => {
            this.setState({error : null})
        }

        render(){
            return(
                <Base>
                    <Modal 
                        show={this.state.shouldShow}
                        modalClosed={this.errorConfirmHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Base>
            );
        }
    } 
}

export default withErrorHandler;