
import Header from '@/components/header/header';
import Ecommerce from '@/components/ecommerce-page/ecommerce';
import { fetchHome } from '@/cms/home';
import { fetchLocales } from '@/cms/langs';
import { defaultLocale } from '@/cms/types';

export default async function Page({ params }: { params: { lang: string } }) {

  return (
    <>
      <Ecommerce />
    </>
  );
}
