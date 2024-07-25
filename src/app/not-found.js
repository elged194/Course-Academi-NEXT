const NotFound = () => {
  return (
    <div
      style={{
        height: "72.6vh",
        display: 'flex' ,
        alignItems: "center",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <p style={{ fontSize: "1.9rem", fontWeight: "bold" }}>Sorry </p>

        <p style={{ fontSize: "1.5rem", fontWeight: "500", marginTop: "1rem" }}>
          we could not find the page you were looing for :(
        </p>
      </div>
    </div>
  );
};

export default NotFound;
