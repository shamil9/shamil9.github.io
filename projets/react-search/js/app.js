var Github = React.createClass({
    render: function () {
        var repos = this.props.response.items || [];
        var showRepos = function (repo) {
            return (
                <li className="repo box-shadow">
                    <a className="repo__name" href={ repo.html_url } alt={ repo.html_url }><i className="fa fa-github" aria-hidden="true"></i> { repo.name }</a><br/>

                    <span className="repo__user"><i className="fa fa-user" aria-hidden="true"></i> <a className="repo__user--link" href={ repo.owner.html_url } alt={ repo.owner.login }>{ repo.owner.login }</a></span>

                    <span className="repo__stars" style={{ float: 'right' }}><i className="fa fa-star" aria-hidden="true"></i> { repo.stargazers_count }</span>
                </li>
            )
        };
        return (
            <div>
                <ul style={{margin: 0, padding: 0}}>
                    { repos.map(showRepos) }
                </ul>
            </div>
        );
    }
});

var GitSearch = React.createClass({
    getInitialState: function () {
        return {
            query: '',
            response: {}
        }
    },

    search: function (e) {
        e.preventDefault();
        var self = this;

        fetch('https://api.github.com/search/repositories?q=' + this.state.query + '&sort=stars')
            .then(function (data) {
                return data.json();
            })
            .then(function (response) {
                self.setState({response: response});
                console.log(response);
            });
    },

    onChange: function (e) {
        this.setState({query: e.target.value});
    },

    render: function () {
        var total = this.state.response.total_count ?
            <h2>Total de depots trouvés <a href={ 'https://github.com/search?q=' + this.state.query }>{ this.state.response.total_count }</a></h2> : '';

        return (
            <div>
                <div className="search box-shadow">
                    <form onSubmit={this.search}>
                        <input className="search__input" onChange={this.onChange} value={this.state.query}
                               placeholder="What are you looking for?" type="text" id="recherche"/>
                    </form>
                </div>
                <div className="results">
                    {total}
                    <div className="results__github" id="github">
                        <Github response={this.state.response}/>
                    </div>
                </div>
            </div>
        );
    }
});

ReactDOM.render(<GitSearch />, document.getElementById('app'));
