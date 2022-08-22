function Donor({ donor }) {
    return (
      <li className="list-item">
        <div className="content">
          <span className="item">{donor.name}</span>
          <span className="item">{donor.surname}</span>
          <span className="item">{donor.donation}</span>
        </div>
        
      </li>
    );
  }
  
  export default Donor;
  