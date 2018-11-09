import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadActions } from './../redux/operations/operations'
import AsideFeed from './AsideFeed'

const mapStateToProps = state => {
  return {
    actions: state.actions.actions
  }
}

class Feed extends Component {
  componentWillReceiveProps(nextProps) {
  }

  componentWillMount() {
    this.props.loadActions()
  }

  render() {
    const actions = this.props.actions.reverse().map((action) =>
      <div className="post-panel">
        <div className="post-metadata">
          <img alt="" className="avatar-image" src={action.author.providerPic} height="30" width="30"/>
          <div className="post-info">
              <div data-react-className="PopoverLink">
              <span className="popover-link" data-reactroot=""><a href={`/profile/${action.author.id}`}>{action.author.name}</a></span></div>
              <small>Posted • A must read</small>
            </div>
          </div>
          {action.featureImg.length > 0 ? <div class="post-picture-wrapper">
            <img src={action.featureImg} alt="Thumb" />
          </div>:''}
          <div className="main-body">
            <h3 className="post-title"><a href={`/actionview/${action.id}`} >{action.title}</a></h3>
            <div className="post-body">
              <p className="" dangerouslySetInnerHTML={{__html: action.description}}></p>
            </div>
            <a className="read-more" href={`/actionview/${action.id}`}>Read more</a>
          </div>
          <div className="post-stats clearfix">
            <div className="pull-left">
              <div className="like-button-wrapper">
                <form className="button_to" method="get" action="">
                  <button className="like-button" data-behavior="trigger-overlay" type="submit"><i className="fa fa-heart-o"></i><span className="hide-text">Like</span></button></form>
                <span className="like-count">{action.rating}</span>
              </div>
            </div>
            <div className="pull-right">
              <div className="bookmark-button-wrapper">
                <form className="button_to" method="get" action=""><button className="bookmark-button" data-behavior="trigger-overlay" type="submit">      <span className="icon-bookmark-o"></span><span className="hide-text">Bookmark</span></button></form>
              </div>
            </div>
            <div className="response-count pull-right">
            </div>
          </div>
      </div>
    )
    return (
      <div>
        <div className="container-fluid main-container">
          <div className="col-md-6 col-md-offset-1 dashboard-main-content">
            <div className="posts-wrapper animated fadeInUp" data-behavior="endless-scroll" data-animation="fadeInUp-fadeOutDown">
              {actions}
            </div>
          </div>
          {this.props.actions ? <AsideFeed _actions={this.props.actions} /> : ''}
        </div>
      </div>
    )
  }
}
export default connect(mapStateToProps, { loadActions })(Feed);
