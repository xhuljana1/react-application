import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { sortBy } from 'lodash';
import {Button, Sorts} from '../Button/index';

const SORTS = {
    NONE: list => list,
    // the arguments of sortBy : a list to sort on , and the option to sort : sort the list based on title 
    TITLE: list => sortBy(list, "title"),
    AUTHOR: list => sortBy(list, "author")
}


class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sortKey: "NONE",
            isSortReverse: false
        }

        this.onSort = this.onSort.bind(this);
    }


    onSort(sortKey) {
        const isSortReverse = this.state.sortKey === sortKey && !this.state.isSortReverse;
        this.setState({ sortKey, isSortReverse });
    }

    render() {

        const { result, removeItem } = this.props;
        const { sortKey, isSortReverse } = this.state;
        const sortedList = SORTS[sortKey](result);
        const reverseSortedList = isSortReverse ? sortedList.reverse() : sortedList;

        return (
            <div>
                <div className="text-center">
                    <Sorts
                        className="btn btn-xs btn-default sortBtn"
                        sortKey={'NONE'}
                        onSort={this.onSort}
                        activeSortKey={sortKey}
                    >
                        Sort by Default
        </Sorts>

                    <Sorts
                        className="btn btn-xs btn-default sortBtn"
                        sortKey={'TITLE'}
                        onSort={this.onSort}
                        activeSortKey={sortKey}
                    >
                        Sort by Title
        </Sorts>

                    <Sorts
                        className="btn btn-xs btn-default sortBtn"
                        sortKey={'AUTHOR'}
                        onSort={this.onSort}
                        activeSortKey={sortKey}
                    >
                        Sort by Author
        </Sorts>
                    <hr />
                </div>

                {
                    reverseSortedList.map(i =>
                        <div key={i.objectID}>
                            <h1><a href={i.url}> {i.title}</a> by {i.author}</h1>
                            <h4>{i.author} Author | {i.title} Title </h4>
                            <Button
                                type="button"
                                onClick={() => removeItem(i.objectID)}> Remove </Button>
                        </div>
                    )
                }
            </div>
        )
    }
}

Table.propTypes = {
    result: PropTypes.arrayOf(
        PropTypes.shape({
            objectID: PropTypes.string.isRequired,
            author: PropTypes.string,
            url: PropTypes.string,
        })
    ).isRequired,
    removeItem: PropTypes.func.isRequired
}

export default Table;