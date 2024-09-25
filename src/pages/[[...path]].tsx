import{ useEffect } from 'react';
import{ GetServerSideProps } from 'next';
import NotFound from 'src/NotFound';
import Layout from 'src/Layout';
import{ SitecorePageProps } from 'lib/page-props';
import{ sitecorePagePropsFactory } from 'lib/page-props-factory';

import{
  SitecoreContext,
  ComponentPropsContext
} from '@sitecore-jss/sitecore-jss-nextjs';
import { handleEditorFastRefresh } from '@sitecore-jss/sitecore-jss-nextjs/utils';
import { componentBuilder } from 'temp/componentBuilder';

const SitecorePage = ({
  notFound,
  componentProps,
  layoutData
}: SitecorePageProps): JSX.Element=>{
useEffect(()=>{
// Since Sitecore editors do not support Fast Refresh, need to refresh EE chromes after Fast Refresh finished
handleEditorFastRefresh();
}, []);
if(notFound){
// Shouldn't hit this (as long as 'notFound' is being returned below), but just to be safe
return <NotFound />;
}
const isEditing = layoutData.sitecore.context.pageEditing;

return(
  <>
  <h1>default page  SSR</h1>
    <ComponentPropsContext value={componentProps}>
      <SitecoreContext
        componentFactory={componentBuilder.getComponentFactory({ isEditing })}
        layoutData = {layoutData}>
        <Layout layoutData={layoutData} headLinks={[]} />
      </SitecoreContext>
    </ComponentPropsContext>
    </>
);
};
// This function gets called at request time on server-side.
export const getServerSideProps: GetServerSideProps = async(context)=>{
const props = await sitecorePagePropsFactory.create(context);
return{
    props,
    notFound: props.notFound, // Returns custom 404 page with a status code of 404 when true
};
};
export default SitecorePage;