'use client'

import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { getAppUserInfo } from '@yg/app-bridge/esm/biz/app';



export default function Dashboard() {
  const t = useTranslations();

  const handleClick = () => {
    const appUserInfo = getAppUserInfo();
    console.log("🚀 ~ handleClick ~ appUserInfo:", appUserInfo)
  };

  return (
    <div>
      <h1>
      {t('supportRank')}
    </h1>
    <Button onClick={handleClick}>点击</Button>
    </div>
  );
}
