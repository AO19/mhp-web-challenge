import React, { Component } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import getFullHouse from '../helpers/apiFunctions';

export const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const HouseStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  letter-spacing: 0.25rem;
  max-width: 80vw;
  p {
    border: 5px solid gold;
    padding: 5px;
    background-color: white;
  }
  #lordName a {
    text-decoration: none;
    color: inherit;
    & :hover {
      color: gold;
    }
  }
`;

const SwornMembersStyles = styled.ul`
  list-style: none;
  li:hover {
    cursor: pointer;
    color: gold;
  }
`;

export default class SingleHouse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      house: null,
    };
  }

  async componentDidMount() {
    const house = await getFullHouse(this.props.id);
    this.setState({
      house,
    });
  }

  render() {
    const { house } = this.state;
    if (house === null) {
      return null;
    }
    let currentLordId;
    if (house.currentLord.url) currentLordId = house.currentLord.url.match(/([^\/]+$)/g);
    return (
      <Center>
        <HouseStyles>
          <p>{house.name}</p>
          <p>founded {house.founded ? house.founded : 'Unknown'} by {house.founder.name ? house.founder.name : 'Unknown'}</p>
          <p>Located in <u>{house.region}</u></p>
          {house.coatOfArms ? <p id='coa'>"{house.coatOfArms}"</p> : ''}
          <p><u>Overlord</u>: {house.overlord ? house.overlord.name : '~ Unknown Overlord ~'}</p>
          <p id='lordName'><u>Lord</u>: {house.currentLord ? <Link href={{ pathname: '/character', query: { id: currentLordId } }}>{house.currentLord.name}</Link> : '~ Unknown Lord ~'}</p>
          <SwornMembersStyles>
            <u>Sworn Members ({house.swornMembers.length})</u>:
            <>
              {house.swornMembers.map(
                member => {
                  const memberId = member.url.match(/([^\/]+$)/g);
                  return (
                    <Link key={memberId} href={{
                      pathname: '/character',
                      query: { id: memberId },
                    }}
                    >
                      <li>{member.name}</li>
                    </Link>
                  );
                }
              )}
            </>
          </SwornMembersStyles>
        </HouseStyles>
      </Center>
    )
  }
}
