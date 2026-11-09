import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router';
import styled from 'styled-components';
import { BagIcon, BoxIcon, UsersIcon } from '@/assets/Icons';
import { paths } from '@/Routes/paths';
import { SIDEBAR_WIDTH } from '@/Shared/theme/layout';

const Aside = styled.aside`
  position: fixed;
  inset-block: 0;
  inset-inline-start: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
  width: ${SIDEBAR_WIDTH}px;
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.header};
  color: ${({ theme }) => theme.colors.onHeader};
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding-inline: ${({ theme }) => theme.spacing.sm};

  svg {
    color: ${({ theme }) => theme.colors.accent};
  }

  strong {
    display: block;
    font-size: 20px;
    letter-spacing: 0.04em;
  }

  span {
    font-size: 12px;
    opacity: 0.7;
  }
`;

const List = styled.ul`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xs};
  list-style: none;
`;

const Item = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  min-height: 44px;
  padding-inline: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radius.md};
  color: inherit;
  font-weight: 500;
  text-decoration: none;
  opacity: 0.8;

  &:hover {
    background: rgb(255 255 255 / 8%);
    opacity: 1;
  }

  &.active {
    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.onAccent};
    opacity: 1;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
  }
`;

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
