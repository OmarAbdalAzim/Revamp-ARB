import React, { Component } from 'react';
import { OfferCategoryProvider } from 'src/Services/OfferCategoryService';
import styles from '../assets/custom-style';
import Offer from './Offer';
import { CommponentSettings } from 'src/configurations/Constants';

class OthersOfferCategory extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      offerCategory: null,
    };
    this.OfferCategoryService = new OfferCategoryProvider();
  }

  componentDidMount() {
    this.handleSearch();
  }

  handleSearch = async () => {
    const language = 'en';
    try {
      const offerCategory = await this.OfferCategoryService.getOfferCategory(
        language,
        CommponentSettings.SuggestedOfferCategoryItemSkip3,
        CommponentSettings.OtherOfferCategoryPageSize
      );
      if (offerCategory) {
        this.setState({ offerCategory });
        console.log('offerCategory fetched:', offerCategory);
      }
    } catch (error) {
      console.error('Error fetching offerCategory:', error);
    }
  };

  render() {
    return (
      <div style={styles.container}>
        <h1>Other Offers</h1><br />
        {this.state?.offerCategory?.results?.map((res) => (
          <div
            key={res.id}
            style={{ width: '100%', padding: '0 20px', display: 'flex', justifyContent: 'center' }}
          >
            <div style={styles.cardStyle}>
              <div style={styles.imageStyle}>
                <img src={res?.OfferSliderImage?.src} alt={''} style={styles.image} />
                <div style={styles.smallImagesContainer}>
                  <Offer id={res.id} />
                </div>
              </div>
              <div style={styles.detailsStyle}>
                <span style={styles.tag}>{res?.children?.total} Offers</span>
                <h3 style={styles.title}>
                  <a href={res?.url?.path}>{res.title.value}</a>
                </h3>
                <p style={styles.description}>{res?.Content?.value}</p>
                <a href={res?.url?.path}>
                  <button style={styles.button}>View All</button>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
export default OthersOfferCategory;
