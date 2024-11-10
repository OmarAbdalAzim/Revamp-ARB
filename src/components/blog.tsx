import React, { useEffect, useMemo, useState } from 'react';
import { GraphQlAPI } from 'src/pages/api/graphQl/Services/GraphQlAPI';
import Blog_Query from 'src/pages/api/graphQl/Blog/BlogQuery';

const blog = () => {
  const graphQlAPI = useMemo(() => new GraphQlAPI(), []);
  const [blogs, setBlogList] = useState<unknown>();
  useEffect(() => {
    const getBlog = async () => {
      try {
        const blogList = await graphQlAPI.getItems(Blog_Query('en', '', '', ''));
        setBlogList(blogList);
      } catch (error) {}
    };
    getBlog();
  }, [graphQlAPI]); // Empty dependency array ensures useEffect runs only once on mount

  const divStyle: React.CSSProperties = {
    width: '300px', // Set width here
    height: '2000px', // Set height here
  };

  return (
    <>
      <div>
        {blogs?.results?.map((res: any) => (
          <>
            <div className={`component promo`} style={divStyle}>
              <div className="component-content">
                <div className="field-promoicon">
                  <a href="#!">
                    <img
                      loading="lazy"
                      src={res?.image?.src}
                      alt={''} // Providing a fallback for the alt attribute
                    />
                  </a>
                </div>
                <div className="promo-text">
                  <div>
                    <div className="field-promotext">
                      <span>
                        <h2>
                          <a href="#!">{res?.title?.value}</a>
                        </h2>
                        <br />
                        <p>{res?.content?.value}</p>
                        <br />
                        <h2>Related MultilistField values</h2>
                        {res?.treeList?.targetItems?.map((itm: any) => (
                          <>
                            <span>
                              <h5>treeList Title:</h5> <p> {itm.fields[1]['value']}</p>
                              <h5>treeList Order: </h5>
                              <p>{itm?.fields[0]['value']}</p>
                            </span>
                          </>
                        ))}
                        <br />
                        <h2>Related drop Link Field values</h2>
                        <span>
                          <h5>dropLink Title:</h5>{' '}
                          <p> {res?.dropLinkField?.targetItem?.fields[1]['value']}</p>
                          <h5>dropLink Order:</h5>{' '}
                          <p> {res?.dropLinkField?.targetItem?.fields[0]['value']}</p>
                        </span>

                        <br />
                        <h2>Related dropList Field values</h2>
                        <span>
                          <h5>dropList Title:</h5> <p> {res?.dropListField?.value}</p>
                        </span>
                        <br />
                        <h2>Related nameValueList Field values</h2>
                        <span>
                          <h5>Name Value List values:</h5> <p> {res?.nameValueListField?.value}</p>
                        </span>
                        <br />
                        <h2>Related Tree List values</h2>
                        {res?.treeList?.targetItems?.map((itm: any) => (
                          <>
                            <span>
                              <h5>treeList Title:</h5> <p> {itm?.fields[1]['value']}</p>
                              <h5>treeList Order: </h5>
                              <p>{itm?.fields[0]['value']}</p>
                            </span>
                          </>
                        ))}
                        <br />
                        <h2>generalLink properties value</h2>
                        <span>
                          <h5>generalLink Title:</h5> <p> {res?.generalLink?.url}</p>
                        </span>
                        <br />
                        <h2>checkboxField value</h2>
                        <span>
                          <h5>checkboxField value :</h5>{' '}
                          <span> {res?.checkboxField?.boolValue ? 'true' : 'false'}</span>
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="field-promolink"></div>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default blog;
