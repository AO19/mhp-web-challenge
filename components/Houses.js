import React, { Component } from 'react';
import styled from 'styled-components';
import InfiniteScroll from 'react-infinite-scroll-component';
import HouseCard from './HouseCard';
import { getHouseListPage } from '../helpers/apiFunctions';

const HouseListGrid = styled.div`
  max-width: 90vw;
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 25px;
  justify-items: center;
  align-items: content;
  overflow-x: hidden;
  @media (max-width: 600px) {
    grid-template-columns: 90vw;
  }
`;

export default class Houses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      houseList: [],
      count: 1,
      page: 9,
    };

    this.fetchNextHouses = this.fetchNextHouses.bind(this);
  }

  async componentDidMount() {
    const { count } = this.state;
    const houses = await getHouseListPage(count);
    this.setState({
      houseList: houses,
    });
  }

  fetchNextHouses() {
    let { count, houseList } = this.state;
    count += 1;
    fetch(`https://www.anapioficeandfire.com/api/houses?page=${count}&pageSize=9`)
      .then(response => response.json()).then(data => this.setState({ houseList: houseList.concat(data), count }));
  }

  render() {
    const { houseList, count } = this.state;
    return (
      <>
        <InfiniteScroll
          dataLength={houseList.length}
          next={this.fetchNextHouses}
          hasMore={count === 51 ? false : true}
          endMessage={<h4> - You've seen all houses - </h4>}
          loader={<h4>Loading...</h4>}
        >
          <HouseListGrid>
            {houseList.map(house => <HouseCard key={house.name} house={house} />)}
          </HouseListGrid>
        </InfiniteScroll>
      </>
    )
  }
}
