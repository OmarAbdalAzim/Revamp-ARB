import { Text, Field, RichText } from '@sitecore-jss/sitecore-jss-nextjs';

type Promo1Props = {
  fields: {
    heading: Field<string>,
    body: Field<string>  
  };
}

const Promo1 = (props: Promo1Props): JSX.Element => (
  <div className="container-full">
    <div className='col-12'>
        <h1 className='text-center'>
    <Text field={props.fields.heading} />
    </h1>
    </div>
    
    <RichText field={props.fields.body} />
  </div>
);

export default Promo1;