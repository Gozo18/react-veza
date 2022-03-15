import { useState, useEffect } from "react";

function TownDataSearch({ users }) {
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    setFilterData(users);
  }, [users]);

  const onChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredUsers = users.filter((v) => {
      return v.town.toLowerCase().match(new RegExp(searchTerm, "g"));
    });
    setFilterData(filteredUsers);
  };

  return (
    <div className='userBox'>
      <div className='userHeaderBox'>
        <div className='userHeader'>
          <h4>List uživatelů</h4>
        </div>
        <div className='userHeaderInputBox'>
          <input type='text' onChange={onChange} placeholder='Napište město' />
        </div>
      </div>
      {filterData.map((us, i) => {
        return (
          <div key={i} className='userItem'>
            <div className='userItemName'>{us.name}</div>
            <div className='userItemStreet'>{us.street}</div>
            <div className='userItemTown'>{us.town}</div>
            <div className='userItemPsc'>{us.psc}</div>
            <div className='userItemPhone'>tel.: {us.phone}</div>
            <div className='userItemEmail'>e-mail: {us.email}</div>
          </div>
        );
      })}
    </div>
  );
}

export default TownDataSearch;
