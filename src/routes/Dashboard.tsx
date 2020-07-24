import React from 'react'
import ArtisanList from '../components/ArtisanList';
import SearchBar from '../components/SearchBar';
import FloatingActionButtons from '../components/Fab';
import { useHistory } from 'react-router-dom';

export default function Dashboard() {
  const history = useHistory();

  const handleClick = () => {
    history.push('/artisans/add')
  }

  return (
    <div className='animated fadeIn'>
      <div className="col-md-7 ml-auto mr-auto p-0 mb-5 searchBar">
        <SearchBar />
      </div>
      <div className="col-md-7 ml-auto mr-auto p-0 mb-5">
        <ArtisanList
          firstname='James'
          lastname='Adams'
          imageUrl='https://avatars3.githubusercontent.com/u/24472484?s=460&u=bb7c81f37704b584029e0aa21d5f02d48a84ad2f&v=4'
          rating={3.4}
          specialization="Welding, Soldering, Mechanic"
          address='No. 23 Golden street, Ikeja' />

        <ArtisanList
          firstname='James'
          lastname='Adams'
          imageUrl='https://avatars3.githubusercontent.com/u/24472484?s=460&u=bb7c81f37704b584029e0aa21d5f02d48a84ad2f&v=4'
          rating={3.4}
          specialization="Welding, Soldering, Mechanic"
          address='No. 23 Golden street, Ikeja' />
      </div>

      <div style={{ ...styles.fab, position: 'fixed' }}>
        <FloatingActionButtons onClick={handleClick} />
      </div>
    </div>
  )
}

const styles = {
  fab: {
    bottom: 50,
    right: 20,
    width: "auto",
  }
}