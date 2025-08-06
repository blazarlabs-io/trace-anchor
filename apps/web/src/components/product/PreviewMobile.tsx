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

export default function PreviewMobile() {

  const sections: {
    id: string;
    containerClassName?: string;
    gridTemplateClass?: string;
    blocks: BlockConfig[];
    columns?: number;
  }[] = [
    {
      id: 'product',
      blocks: ProductBlocks,
    }, 
    {
      id: 'materials',
      containerClassName: 'mt-[100px]',
      blocks: materialsBlocks,
    },
    {
      id: 'designDetails',
      containerClassName: 'mt-[100px]',
      blocks: designDetailsBlocks,
    },
    {
      id: 'careInstruction',
      containerClassName: 'mt-[100px]',
      blocks: careInstructionBlocks,
    },
    {
      id: 'garmentCare',
      containerClassName: 'mt-[100px]',
      blocks: garmentCareBlocks,
    },
    {
      id: 'manufacturer',
      containerClassName: 'mt-[100px] grid grid-cols-2 lg:grid-cols-1 gap-8 items-center',
      blocks: manufacturerBlocks,
    },
    {
      id: 'howItsMade',
      containerClassName: 'mt-[100px] grid grid-cols-1 max-w-[530px] max-auto gap-8 items-center',
      blocks: howItsMadeBlocks,
      columns: 1,
    },
    {
      id: 'davarisTextiles',
      blocks: davarisTextilesBlocks,
    },
    {
      id: 'otherUsefulInfo',
      containerClassName: "mt-[100px] grid grid-cols-1 gap-8 items-center",
      blocks: otherUsefulInfoBlocks, 
      columns: 1,
    },
    {
      id: 'environmentalFootprint',
      blocks: environmentalFootprintBlocks, 
    },
    {
      id: 'twoColBullets',
      blocks: twoColBulletsBlocks, 
      containerClassName: 'mt-[1px] grid grid-cols-2 gap-8 items-center',
    },
    {
      id: 'certificationsCompliance',
      blocks: certificationsComplianceBlocks, 
      containerClassName: 'mt-[100px] grid grid-cols-2 lg:grid-cols-1 gap-8 items-center',
    },
    {
      id: 'logisticsAndManufacturing',
      blocks: logisticsAndManufacturingBlocks, 
      containerClassName: 'mt-[100px] grid grid-cols-1 md:grid-cols-2 gap-8 items-center',
    },
  ];


  return (
    <>
      <Navbar />
      <ProductOverview />
      <Container>
        {sections.map((sec) => (
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
