// Import Libraries
var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');



require('../css/style.css')

// Import Modules
var Card = require('./Card.jsx')
var Menu = require('./Menu.jsx')
var Spinner = require('./Spinner.jsx')


var Main = React.createClass({

    loadLocalStorage: function(key) {
        if (localStorage.state != null && localStorage.state != 'undefined') {
            var state = JSON.parse(localStorage.state)
            return state[key]
        } else {
            return false
        }
    },

    handleMenuSubmit: function(subreddit, limit) {
        this.setState({
            subreddit: subreddit,
            subredditLimit: limit,
            subredditData: [] // Clear Subreddit Data to prevent different Subreddit concatenation
        })

        this.fetchSubredditData(subreddit, limit);
    },

    startSpinner: function() {
        this.setState({
            spinnerDisplay: true
        })
        console.log('Spinner Started')
    },

    stopSpinner: function() {
        this.setState({
            spinnerDisplay: false
        })
        console.log('Spinner Stopped');
    },

    loadMoreHandler: function() {
        this.fetchSubredditData(this.state.subreddit, this.state.subredditLimit, this.state.lastRedditPostID, false);
    },

     loadRandomHandler: function() {
        this.fetchSubredditData(this.state.subreddit, this.state.subredditLimit, this.state.lastRedditPostID, true);
    },

    fetchSubredditData: function(subreddit, limit, after, random) {

        var parent = this;
        this.startSpinner();
        var type = 'new';

        if (subreddit.length > 0) {
            $.getJSON('//www.reddit.com/r/' + subreddit + '/' + type + '.json?' + 'limit=' + limit + '&after=' + after, function(res) {
                parent.setState({
                    subredditData: parent.state.subredditData.concat(res.data.children),
                    lastRedditPostID: res.data.children[res.data.children.length - 1].data.name
                })
                console.log('Fetch Success');
                console.log(parent.state.lastRedditPostID);
                parent.stopSpinner();
            }) // Fetch subreddit data
                .error(function() {
                    console.log("404: Cannot Found The Subreddit: " + subreddit);
                    parent.stopSpinner()
                }); // If error, redirect to homepage
        } else {
            $.getJSON('//www.reddit.com/new.json?' + 'limit=' + limit + '&after=' + after, function(res) {
                parent.setState({
                    subredditData: parent.state.subredditData.concat(res.data.children),
                    lastRedditPostID: res.data.children[res.data.children.length - 1].data.name
                })
                parent.stopSpinner();
            }) // If no subreddit given, fetch reddit homepage.  
                .error(function() {
                    console.log("404: Cannot Connect To Reddit");
                    parent.stopSpinner()
                });
        }
    },

    getInitialState: function() {
        return ({
            subreddit: this.loadLocalStorage('subreddit') || 'historyporn',
            subredditLimit: this.loadLocalStorage('subredditLimit') || 10,
            spinnerDisplay: true,
            subredditData: [],
            lastRedditPostID: null
        });
    },

    componentWillMount: function() {
        window.removeEventListener('scroll', this.handleScroll);
        this.fetchSubredditData(this.state.subreddit, this.state.subredditLimit, this.state.lastRedditPostID)
    },

    componentDidMount: function(){

        window.addEventListener('scroll', this.handleScroll);        

        // reference to last opened menu
        var $lastOpened = false;
  
        // simply close the last opened menu on document click
        $(document).click(function(){
          if($lastOpened){
            $lastOpened.removeClass('open');
          }
        });


        // simple event delegation
        $(document).on('click', '.pulldown-toggle', function(event){
          
          // jquery wrap the el
          var el = $(event.currentTarget);
          
          // prevent this from propagating up
          event.preventDefault();
          event.stopPropagation();

          // check for open state
          if(el.hasClass('open')){
            el.removeClass('open');
          }else{
            if($lastOpened){
              $lastOpened.removeClass('open');
            }
            el.addClass('open');
            $lastOpened = el;
          }
          
        });
    },

    componentDidUpdate: function() {
        localStorage.state = JSON.stringify(this.state);
    },

    loadImages: function() {
        var renderCard;
        if (this.state.subredditData.length > 0) {
            renderCard = <Card data={this.state.subredditData} loadRandom={this.loadRandomHandler} loadMore={this.loadMoreHandler} />
        }
        return renderCard;
    },

    handleScroll: function() {
       
        var scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        var scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
        var scrolledToBottom = (scrollTop + window.innerHeight) >= scrollHeight;
        if (scrolledToBottom && this.state.subredditData.length > 0){
            this.loadMoreHandler();
        }        
    },

    render: function() {
        return (
            <div>
              <Spinner display={ this.state.spinnerDisplay } />
              <Menu subreddit={ this.state.subreddit } limit={ this.state.subredditLimit } onSubmit={ this.handleMenuSubmit } />
              <div className="ui centered stackable grid">
                <div className="twelve wide column">
                    {this.loadImages()}        
                </div>
              </div>
              <Menu subreddit={ this.state.subreddit } limit={ this.state.subredditLimit } onSubmit={ this.handleMenuSubmit } />
            </div>
            );
    }
})

ReactDOM.render(<Main />, document.getElementById('content'));