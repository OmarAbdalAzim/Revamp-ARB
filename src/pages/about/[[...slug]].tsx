import { useEffect } from 'react';
import NotFound from 'src/NotFound';
import Layout from 'src/Layout';
import { SitecoreContext, ComponentPropsContext } from '@sitecore-jss/sitecore-jss-nextjs';
//import { handleEditorFastRefresh } from '@sitecore-jss/sitecore-jss-nextjs/utils';
import { SitecorePageProps } from 'lib/page-props';
import { sitecorePagePropsFactory } from 'lib/page-props-factory';
import { componentBuilder } from 'temp/componentBuilder';
import { GetServerSideProps } from 'next/types';
 
const SitecorePage = ({
  notFound,
  componentProps,
  layoutData,
  headLinks,
}: SitecorePageProps): JSX.Element => {
  console.log('this is ssr');
  useEffect(() => {
    // Since Sitecore editors do not support Fast Refresh, need to refresh editor chromes after Fast Refresh finished
    //handleEditorFastRefresh();
  }, []);
 
  if (notFound || !layoutData.sitecore.route) {
    // Shouldn't hit this (as long as 'notFound' is being returned below), but just to be safe
    return <NotFound />;
  }
 
  const isEditing = layoutData.sitecore.context.pageEditing;
 
  return (
    <>
    <h1>SSR Page</h1>
    <ComponentPropsContext value={componentProps}>
      <SitecoreContext
        componentFactory={componentBuilder.getComponentFactory({ isEditing })}
        layoutData={layoutData}
      >
        <Layout layoutData={layoutData} headLinks={headLinks} />
      </SitecoreContext>
    </ComponentPropsContext>
    </>
  );
};
 

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log('sssr', context)
  if (context?.params) context.params.path = context?.resolvedUrl;
  const props = await sitecorePagePropsFactory.create(context);
 
  return {
    props,
    notFound: props.notFound, // Returns custom 404 page with a status code of 404 when true
  };
};
 
export default SitecorePage;
 
 