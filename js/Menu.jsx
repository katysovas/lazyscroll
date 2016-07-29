var React = require('react')
var $ = require('jquery')
var Headroom = require('react-headroom').default

var Menu = React.createClass({

    handleSubredditChange: function(reddit, event) {
      event.preventDefault();
      this.setState({
          subreddit: reddit
      })
      this.props.onSubmit(reddit, this.state.limit);
    },

    getInitialState: function() {
        return ({
            subreddit: this.props.subreddit,
            limit: this.props.limit
        })
    },

    render: function() {
        return (
            <nav id="menu">  

                <div className="pen-outer">
                  <div className="pulldown">
                    <div className="pulldown-toggle pulldown-toggle-round"><div className="lines"></div></div>
                    <div className="pulldown-menu">
                      <ul>
                        <li><a 
                          href="#"
                          onClick={this.handleSubredditChange.bind(this, 'historyporn')}
                          ><i className="fa fa-bank" aria-hidden="true"></i> History</a></li>
                        <li><a 
                          href="#"
                          onClick={this.handleSubredditChange.bind(this, 'aww')}
                          ><i className="fa fa-paw" aria-hidden="true"></i> Animals</a></li>
                        <li><a 
                          href="#"
                          onClick={this.handleSubredditChange.bind(this, 'nostalgia')}
                          ><i className="fa fa-film" aria-hidden="true"></i> Nostalgia</a></li>
                        <li><a 
                          href="#"
                          onClick={this.handleSubredditChange.bind(this, 'food')}
                          ><i className="fa fa-cutlery" aria-hidden="true"></i> Food</a></li>
                        <li><a 
                          href="#"
                          onClick={this.handleSubredditChange.bind(this, 'DIY')}
                          ><i className="fa fa-wrench" aria-hidden="true"></i> DIY</a></li>                        
                        <li><a 
                          href="#"
                          onClick={this.handleSubredditChange.bind(this, 'RoomPorn')}
                          ><i className="fa fa-lightbulb-o" aria-hidden="true"></i> Interior Design</a></li>
                        <li><a 
                          href="#"
                          onClick={this.handleSubredditChange.bind(this, 'gaming')}
                          ><i className="fa fa-gamepad" aria-hidden="true"></i> Gaming</a></li>
                        <li><a 
                          href="#"
                          onClick={this.handleSubredditChange.bind(this, 'photoshopbattles')}
                          ><i className="fa fa-camera-retro" aria-hidden="true"></i> Random</a></li>
                      </ul>
                    </div>

                  </div>
                </div>
                

                

             
            </nav>


        )
    }
})

module.exports = Menu;