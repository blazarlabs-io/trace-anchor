import React from 'react';
import Container from '@/components/product/Container';
import LabelSeparator from '@/components/product/LabelSeparator';
import ProductCategory from '@/components/product/ProductCategory';

interface GeneralInfoProps {
  companyName: string;
  collectionName: string;
  productColor: string;
  productCode: string;
	wineryName?: string;
	storeAvailability?: string;
	cdo?: string;
	category?: string;
}

interface ProductOverviewProps {
	generalInfo?: GeneralInfoProps;
}

const ProductOverview: React.FC<ProductOverviewProps> = ({generalInfo}) => {
	return (
		<Container>
			<div className='mt-[110px]'>
				<h2 className='text-[160px] font-Bold leading-[192px] text-center'>
					{generalInfo?.wineryName || ''}
				</h2>
				<LabelSeparator label='SC ALLERT & CO SRL' />
				<div className='mt-[80px]'>
					<ProductCategory
						imageSrc='/images/01.jpg'
						imageHeight={'h-[550px]'}
						contentClassName='mt-[90px]'
						title={generalInfo?.collectionName || 'Black Dress'}
						details={[
							{ label: 'Colour', value: generalInfo?.cdo || ''},
							{ label: 'Product Code', value: generalInfo?.productCode || ''},
							{ label: 'Category', value: generalInfo?.category || ''},
							{ label: 'Store Availability', value: generalInfo?.storeAvailability || '' },
						]}
						imagePosition='left'
					/>
				</div>
			</div>
		</Container>
	);
};

export default ProductOverview;