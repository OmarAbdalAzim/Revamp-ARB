import React, { Component } from 'react';
import { OfferProvider } from 'src/Services/OfferService';

class Offer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      offers: null,
    };
    this.OfferService = new OfferProvider();
  }
  handleSearch = async () => {
    const { id } = this.props;
    const language = 'en';
    debugger;
    try {
      const offers = await this.OfferService.getOffer(id, language);
      debugger;
      if (offers) {
        this.setState({ offers });
        console.log('offers fetched:', offers);
      }
    } catch (error) {
      console.error('Error fetching offers:', error);
    }
  };

  componentDidMount() {
    this.handleSearch();
  }

  render() {
    const styles = {
      container: {
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '15px',
        margin: '10px 0',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        textAlign: 'left',
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
    };

    return (
      <>
        {this.state?.offers?.results?.map((res: any) => (
          <div key={res.id} style={styles.container}>
            <span style={{backgroundColor: '#e0f7fa'}}>{res?.ExpiryDate?.value}</span>
            <img
              src={res?.CardImage?.src}
              alt={''}
              style={{ width: '80px !important', height: '80px !important' }}
            />
            <h3 style={styles.title}>{res.title.value}</h3>
            <p style={styles.description}>{res.SubTitle.value}</p>
            <a href={res?.url.path}>
              <button style={styles.button}>Learn more</button>
            </a>
          </div>
        ))}
      </>
    );
  }
}

export default Offer;
