// OfferCategoryStyles.js
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100vw',
    margin: '0',
    padding: '20px 0',
    background: 'white',
  },
  cardStyle:{
    display: 'flex',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    width: `1000px`,
    height: `500px`,
    marginBottom: '20px',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  smallimage: {
    width: '30% !important',
    height: '20% important',
    objectFit: 'cover',
  },
  imageStyle : {
    flex: '1',
    borderRadius: '5px 0 0 5px',
    overflow: 'hidden',
  },
  title: {
    margin: '0',
    fontSize: '1.5em',
    color: '#333',
  },
  description: {
    color: '#666',
    lineHeight: 1.6,
  },
  tag: {
    display: 'inline-block',
    backgroundColor: '#e0f7fa',
    borderRadius: '12px',
    padding: '4px 8px',
    marginBottom: '10px',
    fontSize: '0.9em',
    color: '#00796b',
    width: '77px',
  },
  button: {
    marginTop: '10px',
    padding: '10px 15px',
    backgroundColor: '#00796b',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    textAlign: 'center',
  },
  smallImagesContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '10px',
    width:'400px',
    overflow:'auto',
  },
  smallImage: {
    width: '23%', // Adjust to fit four images
    height: 'auto',
    borderRadius: '5px',
  },
  detailsStyle : {
    flex: '1',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'left',
  },
  divStyle : {
    width: '300px', // Set width here
    height: '300px', // Set height here
  },
  gridStyle : {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', // Responsive grid
    gap: '20px',
    padding: '20px',
  },mediaCardStyle : {
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '10px',
    textAlign: 'center',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },labelStyle:{
    backgroundColor: 'lightblue',
    borderRadius: '20px', // Adjust for more or less curvature
    padding: '4px 8px', // Optional: add some padding
    
  }, DetailsContainer: {
    maxWidth: '1000px',
    margin: 'auto',
    background: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    padding: '20px',
  },
  DetailsLabelStyle : {
    backgroundColor: 'lightblue',
    borderRadius: '20px', // Adjust for more or less curvature
    padding: '4px 8px', // Optional: add some padding
    
  }
};

export default styles;
