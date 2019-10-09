import React, { Component } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const HouseShield = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 30vw;
  min-height: 35vh;
  background-image: linear-gradient(to bottom, #000000, #313131, #616161, #959595, #cccccc);
  color: white;
  border-radius: 5px;
  text-align: center;
  font-size: 2vh;
  letter-spacing: 2px;
  line-height: 2rem;
  #button {
    margin: 0 auto;
    padding: 15px;
  }
  @media (max-width: 600px) {
    min-width: 90vw;
  }
`;

const HouseName = styled.p`
  text-decoration: underline;
`;

const HouseInformation = styled.ul`
  display: flex;
  flex-direction: column;
  text-align: left;
  li {
    list-style: none;
  }
  p {
    font-size: 0.75rem;
    color: gold;
  }
  small {
    font-size: 0.75rem;
  }
`;

const VisitHouseButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: relative;
  background-color: black;
  min-width: 10vw;
  min-height: 2rem;
  font-size: 1.5rem;
  font-weight: bold;
  font-family: Game;
  padding: 5px;
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 5px;
`;

export default class HouseCard extends Component {
  state = {
    currentLord: {},
  };

  async componentDidMount() {
    if (this.props.house.currentLord) {
      const currentLord = await fetch(this.props.house.currentLord).then(response => response.json());
      this.setState({
        currentLord,
      })
    }
  }

  render() {
    const { house } = this.props;
    const { currentLord } = this.state;
    const houseId = house.url.match(/([^\/]+$)/g);
    return (
      <HouseShield>
        <HouseName>{house.name}</HouseName>
        <HouseInformation>
          <li>🗺️ {house.region}</li>
          <li><p>"{house.coatOfArms}"</p></li>
          <li>👑 {currentLord.name} <small>({currentLord.born && currentLord.born} - †{currentLord.died && currentLord.died})</small></li>
        </HouseInformation>
        <div id="button">
          <Link href={{
            pathname: '/house',
            query: { id: houseId },
          }}
          >
            <VisitHouseButton>Visit House</VisitHouseButton>
          </Link>
        </div>
      </HouseShield>
    )
  }
}
