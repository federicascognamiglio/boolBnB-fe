function HouseCard() {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <img
        src="../images/caption.jpg"
        className="card-img-top"
        alt="Annuncio Casa"
      />
      <div className="card-body position-relative">
        <h5 className="card-title">Villa Amantea</h5>
        <p className="card-text">
          Nocera Inferiore
        </p>
        <a href="/detail" className="btn btn-primary">
          Vedi dettagli
        </a>
      </div>
    </div>
  );
}

export default HouseCard;
