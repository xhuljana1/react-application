import React, { Component } from 'react';
import { Grid, Row } from 'react-bootstrap'
import Table from '../Table/index';
import {Button, Loading} from '../Button/index';

import {
    DEFAULT_QUERY,
    DEFAULT_PAGE,
    DEFAULT_HPP,
    PATH_BASE,
    PATH_SEARCH,
    PARAM_SEARCH,
    PARAM_PAGE,
    PARAM_HPP
} from '../../constants/index.js'


const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}&${PARAM_PAGE}&${PARAM_HPP}${DEFAULT_HPP}`;
console.log(url);

const withLoading = (Component) => ({ isLoading, ...rest }) =>
    isLoading ? <Loading /> : <Component {...rest} />

const updateTopStories = (hits, page) => prevState => {
    const { searchKey, results } = prevState;
    const oldHits = results && results[searchKey] ? results[searchKey].hits : [];
    const updateHits = [...oldHits, ...hits];

    return {
        results: { ...results, [searchKey]: { hits: updateHits, page } },
        isLoading: false
    }

}


class Python extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: null,
            searchKey: '',
            searchTerm: 'python',
            isLoading: false
        }
        // binding the functions to this (app component)
        this.removeItem = this.removeItem.bind(this);
        this.searchValue = this.searchValue.bind(this);
        this.fetchTopStories = this.fetchTopStories.bind(this);
        this.setTopStories = this.setTopStories.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }


    checkTopStoriesSearchTerm(searchTerm) {
        return !this.state.results[searchTerm];
    }

    // set the top stories. Gets the results and pass it to the setState()
    setTopStories(result) {
        const { hits, page } = result;
        this.setState(updateTopStories(hits, page));
    }

    // FETCH DATA IN API BASED ON THE sEARCHtERM THAT WE USED BEFORE
    fetchTopStories(searchTerm, page) {
        this.setState({ isLoading: true });
        fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`, {
            // mode: 'opaque',
            method: 'GET',
            headers: {
                Accept: 'application/json',
            }
        })
            .then(response => {
                if (response != null) {
                    response.json().then(json => {
                        console.log(json);
                        this.setTopStories(json)
                    });
                }
            })
            .catch(e => e);
    }

    // component DID MOUNT >> lifecycle method
    // runs once the component is mounted but before render function runs
    componentDidMount() {
        const { searchTerm } = this.state;
        this.setState({ searchKey: searchTerm });
        this.fetchTopStories(searchTerm, DEFAULT_PAGE);
    }

    // on search submit function
    onSubmit(event) {
        const { searchTerm } = this.state;
        this.setState({ searchKey: searchTerm });
        if (this.checkTopStoriesSearchTerm(searchTerm)) {
            this.fetchTopStories(searchTerm, DEFAULT_PAGE);
        }
        event.preventDefault();
    }


    removeItem(id) {
        const { results, searchKey } = this.state;
        const { hits, page } = results[searchKey];
        const isNotId = item => item.objectID !== id;
        const updatedList = hits.filter(isNotId);
        // this.setState({ result: Object.assign({}, this.state.result, {hits: updatedList}) });
        this.setState({ results: { ...results, [searchKey]: { hits: updatedList, page } } });
        console.log(updatedList);
    }

    searchValue(event) {
        this.setState({ searchTerm: event.target.value });
    }

    render() {
        const { results, searchTerm, searchKey, isLoading } = this.state;
        const page = (results && results[searchKey] && results[searchKey].page) || 0;
        const list = (results && results[searchKey] && results[searchKey].hits) || [];
        return (
            <div className="App ">
                <Grid>
                    <Row>
                        <Table
                            result={list}
                            removeItem={this.removeItem}
                        />
                        <div className="text-center alert">
                            <ButtonWithLoading
                                isLoading={isLoading}
                                className="btn btn-success"
                                onClick={() => this.fetchTopStories(searchTerm, page + 1)}>
                                Load More
            </ButtonWithLoading>
                        </div>
                    </Row>
                </Grid>

            </div>
        );
    }
}


const ButtonWithLoading = withLoading(Button);

export default Python;
