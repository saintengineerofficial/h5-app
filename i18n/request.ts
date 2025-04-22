import { getRequestConfig } from 'next-intl/server';
import { getLocale } from '.';
import { headers } from 'next/headers';

export async function getTranslationId() {
    try {
        const headersList = headers();
        const url = (await headersList).get('x-url') || '';
        const searchParams = new URL(url).searchParams;
        return searchParams.get('translateId') ;
    } catch {
        throw new Error('Failed to get translation id');
    }
}

export default getRequestConfig(async () => {
  const locale = await getLocale();
  const id = await getTranslationId();

  let messages;
  try {
    messages = (await import(`../messages/${id}/${locale}.json`)).default;
  } catch (error) {
    console.error('Failed to load translations:', error);
  }

  return {
    locale,
    messages,
  };
});