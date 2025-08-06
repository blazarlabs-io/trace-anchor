import React from 'react';
import ProductRender, { BlockConfig } from '@/components/product/ProductRender';
import Container from '@/components/product/Container';
import Navbar from '@/components/product/Navbar';

// Content for the product page
import ProductOverview from '@/components/product/ProductOverview';
import { 
  materialsBlocks, 
  ProductBlocks, 
  designDetailsBlocks, 
  careInstructionBlocks, 
  garmentCareBlocks, 
  manufacturerBlocks,
  howItsMadeBlocks,
  davarisTextilesBlocks,
  otherUsefulInfoBlocks,
  environmentalFootprintBlocks,
  twoColBulletsBlocks,
  certificationsComplianceBlocks,
  logisticsAndManufacturingBlocks
} from '@/components/product/Data';

// Types
export interface DataProps {
  id: string;
  containerClassName?: string;
  gridTemplateClass?: string;
  blocks: BlockConfig[];
  columns?: number;
}

interface GeneralInfoProps {
  companyName: string;
  collectionName: string;
  productColor: string;
  productCode: string;
}

interface PreviewDesktopProps {
  sections: DataProps[];
  generalInfo?: GeneralInfoProps;
}

export default function SectionDesktop({sections, generalInfo}: PreviewDesktopProps) {


  return (
    <>
      <Container>
        {sections?.map((sec) => (
          <ProductRender
            key={sec.id}
            blocks={sec.blocks}
            columns={sec.columns}
            containerClassName={sec.containerClassName}
            gridTemplateClass={sec.gridTemplateClass}
          />
        ))}
      </Container>
    </>
  );
}
