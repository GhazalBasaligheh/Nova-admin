import { useTranslation } from 'react-i18next';
import { Table, TableWrapper, Thumb } from '@/Shared/DataTable';
import { useFormatters } from '@/Shared/useFormatters';
import type { Product } from '@/types/product';

export function ProductsTable({ products }: { products: Product[] }) {
  const { t } = useTranslation();
  const { price, category } = useFormatters();

  return (
    <TableWrapper>
      <Table>
        <thead>
          <tr>
            <th scope="col">{t('Products.columns.image')}</th>
            <th scope="col">{t('Products.columns.title')}</th>
            <th scope="col">{t('Products.columns.price')}</th>
            <th scope="col">{t('Products.columns.category')}</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                {/* The title cell names the row, so the image is decorative here. */}
                <Thumb src={product.image} alt="" loading="lazy" />
              </td>
              <td lang="en" dir="auto">
                {product.title}
              </td>
              <td dir="ltr">{price(product.price)}</td>
              <td>{category(product.category)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </TableWrapper>
  );
}
