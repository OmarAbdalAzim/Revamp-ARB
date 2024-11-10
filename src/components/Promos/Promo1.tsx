import { Text, Field, RichText,  useComponentProps, ComponentRendering, GetStaticComponentProps } from '@sitecore-jss/sitecore-jss-nextjs';

type Promo1Props = {
  rendering: ComponentRendering;
  fields: {
    heading: Field<string>,
    body: Field<string>  
  };
}

const Promo1 = (props: Promo1Props): JSX.Element => {
  const externalData = useComponentProps<any>(props.rendering.uid);
  //console.log("externalData", externalData?.sitecore?.route?.fields?.Title?.value);
  return (
    <div className="container-full">
    <div className="col-12">
        <h1 className="text-center">
    <Text field={externalData?.sitecore?.route?.fields?.Title} />
    </h1>
    </div>
    
    <RichText field={props.fields.body} />
  </div>
  )

  
};
export const getStaticProps: GetStaticComponentProps  = async () => {
  const result = await fetchPost();
  if (result.errors) {
    console.error('errors:', result.errors);
  } else {
    return result;
  }
};

const fetchPost = () =>
  fetch('https://' + process.env.SITECOREHOSTNAME + '/sitecore/api/layout/render/jss?item={079C9644-CCE8-4A3A-89CB-6A5BDAA653E2}&sc_apikey='+ process.env.SITECORE_API_KEY).then((res) => res.json());

export default Promo1;