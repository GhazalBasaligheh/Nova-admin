import { useTranslation } from 'react-i18next';
import { BagIcon, BoxIcon, UsersIcon } from '@/assets/Icons';
import { paths } from '@/Routes/paths';
import { Aside, Brand, List, Item } from './Sidebar.styles';

export function Sidebar() {
  const { t } = useTranslation();

  return (
    <Aside>
      <Brand>
        <BagIcon size={30} />
        <div>
          <strong>{t('Brand.name')}</strong>
          <span>{t('Brand.panel')}</span>
        </div>
      </Brand>
      <nav aria-label={t('Nav.main')}>
        <List>
          <li>
            <Item to={paths.products}>
              <BoxIcon />
              {t('Nav.products')}
            </Item>
          </li>
          <li>
            <Item to={paths.users}>
              <UsersIcon />
              {t('Nav.users')}
            </Item>
          </li>
        </List>
      </nav>
    </Aside>
  );
}
