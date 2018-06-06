import React from 'react';
import { Link } from 'react-router-dom';
import PostContainer from './post_container';
import NavBar from '../navbar/navbar';
import CommentIndex from '../comments/comment_index_container';
import CreateComment from '../comments/create_comment_container';

class Post extends React.Component {
  constructor() {
    super();
    this.state = {
      altText: 'Loading...'
    }
    this.handleDelete = this.handleDelete.bind(this);
    this.displayVotes = this.displayVotes.bind(this);
  }

  componentDidMount() {
    this.props.fetchPost(this.props.postId).fail(err => {
      if (err.status === 404) {
        this.setState({altText: 'Post not found'});
      }
    });
  }

  displayVotes() {
    const votesCount = this.props.totalVotes;
    let votesString;
    if (votesCount !== 0) {
      if (votesCount === 1 || votesCount === -1) {
        votesString = (`${votesCount} vote`)
      } else {
        votesString = (`${votesCount} votes`)
      }
    } else {
      votesString = "0 Votes";
    }
    return votesString;
  }

  vote(value) {
    if (this.props.loggedIn) {
      let voteData = {
        votable_type: "Post",
        votable_id: this.props.postId,
        value
      }
      this.props.createVote(voteData);
    } else {
      return window.alert("You must be logged in to vote")
    }
  }

  handleDelete() {
    this.props.deletePost(this.props.post.id).then(() => this.setState({altText: 'Post not found'}));
  }

  render() {
    const {post, currentUser} = this.props;
    
    return (
      <div className="post-div">
        <div className="jeff">
        <header className='navbar-container'>
          <NavBar/>
        </header>
        { post ? (
        <div className="whole-container">
          <div className="post-container-main">
            <div className="post-box">
              <div className="post-header">
                <div className="title-container">
                    <div className="post-title">{post.title}</div>

                    <div className="post-user">
                      <span className="by">by</span>
                      <Link to={`/users/${post.user_id}`}>
                        {this.props.author.username}
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="post-image">
                  <div className="post-image-container">
                    <div className="post-image-img">
                      <img className="img-s" src={post.image_url} />
                    </div>
                  </div>
                </div>

                <div className="description-footer">
                  <div>
                    <div className="description">
                    {post.description}
                    </div>
                    <span></span>
                  </div>
                </div>

                <div className="empty-div"></div>

                <div className="post-footer">
                  <div className="post-stuff">
                    <div className="post-icons">

                      <button onClick={() => this.vote(1)} className="upvote-button">
                      </button>

                      <button onClick={() => this.vote(-1)} className="downvote-button">
                      </button>

                      <button className="favorite-button">
                      </button>

                      <div className="post-actions-right">
                        <span className="ellipses">...</span>
                          <div className="post-actions-right-dropdown">
                            <div>
                              {post.user_id === (currentUser && currentUser.id) ?
                                <div onClick={this.handleDelete} className='deleteButton'>
                                  Delete Post
                                </div> : null}
                            </div>
                          </div>
                        </div>

                        <div className="social-icons-right">

                          <a className="social-a icon-f" href="http://www.facebook.com/" target="_blank">
                            <span className="social-icon">
                            </span>
                          </a>

                          <a className="social-a icon-twt" href="https://twitter.com/" target="_blank">
                            <span className="social-icon">
                            </span>
                          </a>

                          <a className="social-a icon-pin" href="http://pinterest.com/" target="_blank">
                            <span className="social-icon">
                            </span>
                          </a>

                          <a className="social-a icon-red" href="http://www.reddit.com/" target="_blank">
                            <span className="social-icon">
                            </span>
                          </a>

                        </div>
                      </div>
                      <div className="post-data-footer">
                        <span className="post-stats">
                          <span className="stats-points">{this.displayVotes()}</span>
                          <span className="stats-views">22 views</span>
                        </span>
                      </div>
                    </div>
                </div>
              </div>
            </div>

            <div className="post-create-comment">
              <CreateComment />
            </div>

            <div className="post-show-comment-container">
              <CommentIndex />
            </div>

          </div>
        ) : <h1>{this.state.altText}</h1>}
        </div>
      </div>
    );
  }

}

export default Post;
