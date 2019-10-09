async function getSwornMembers(members) {
  const memberPromises = members.map(member => fetch(member).then(response => response.json()));
  const memberList = await Promise.all(memberPromises);
  return memberList;
}

async function getCurrentLord(lord) {
  const currentLord = await fetch(lord).then(response => response.json());
  return currentLord;
}

async function getOverlord(olord) {
  const overlord = await fetch(olord).then(response => response.json());
  return overlord;
}

async function getFounder(founderLink) {
  const founder = await fetch(founderLink).then(response => response.json());
  return founder;
}

async function getCharacter(person) {
  const character = await fetch(person).then(response => response.json());
  return character;
}

async function getHouseListPage(count) {
  const houses = await fetch(`https://www.anapioficeandfire.com/api/houses?page=${count}&pageSize=9`)
    .then(response => response.json());
  return houses;
}

// get all the needed information on the house
async function getFullHouse(id) {
  const house = await fetch(`https://www.anapioficeandfire.com/api/houses/${id}`).then(response => response.json());
  const houseToFill = house;
  // should be changed to a Promise.all() for performance
  if (houseToFill.swornMembers) houseToFill.swornMembers = await getSwornMembers(house.swornMembers);
  if (houseToFill.currentLord) houseToFill.currentLord = await getCurrentLord(house.currentLord);
  if (houseToFill.overlord) houseToFill.overlord = await getOverlord(house.overlord);
  if (houseToFill.founder) houseToFill.founder = await getFounder(house.founder);
  return houseToFill;
}

export { getCharacter };
export { getHouseListPage };
export default getFullHouse;
