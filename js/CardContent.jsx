var React = require('react')

var CardContent = React.createClass({

    cleanTitle: function() {
      var title = this.props.title;
      title = title.split("[");
      title = title[0].replace('PsBattle:', '');
      return title;
    },

    render: function() {
        return (<div className="content">
                  <a className="header" href={ this.props.postURL }>
                    {this.cleanTitle()}
                  </a>
                  <div className="meta">
                    <a className="share" href={`sms:&body=${this.props.imgURL}`}><i className="fa fa-mobile"></i></a>
                    <a className="share facebook" href={`https://www.facebook.com/sharer/sharer.php?u=${this.props.imgURL}`}><i className="fa fa-facebook"></i></a>
                  </div>
                </div>)
    }
})

module.exports = CardContent;