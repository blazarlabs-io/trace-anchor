import { BlockConfig } from '@/components/product/ProductRender';

// helper to auto‑prefix image props:
  const imgProps = (src: string, h: string) => ({
    src,
    alt: '',
    className: `w-full object-cover ${h}`,
  });

export const ProductBlocks: BlockConfig[] = [
  {
    id: 'product-image',
    type: 'image',
    column: 2,
    props: imgProps('/images/15.jpg', 'h-[340px]'),
  },
  {
    id: 'product-title',
    type: 'title',
    column: 1,
    props: {
      children: 'Product',
      className: 'text-3xl md:text-4xl lg:text-5xl font-bold',
    },
  },
  {
    id: 'product-content',
    type: 'content',
    column: 1,
    props: {
      children: (
        <p>
          The black dress by Julia Allert is crafted from a durable blend of viscose and polyester that maintains its shape and color even after repeated washing. It does not require ironing and resists pilling, while the seams and finishing are designed for long-term wear. Its minimalist design and neutral color support versatile reuse and participation in the brand’s Trade-In program for circular fashion.
        </p>
      ),
      className: 'prose max-w-none',
    },
  },
];

// ----------------------------------------------------------------------------------------


export const materialsBlocks: BlockConfig[] = [
  {
    id: 'materials-image',
    type: 'image',
    column: 1,
    props: {
      src: '/images/14.jpg',
      alt: 'Materials',
      className: 'w-full object-cover h-[340px]',
    },
  },
  {
    id: 'materials-title',
    type: 'title',
    column: 2,
    props: {
      children: 'Materials',
      className: 'text-3xl md:text-4xl lg:text-5xl font-bold',
    },
  },
  {
    id: 'materials-bullets',
    type: 'bullets',
    column: 2,
    props: {
      items: [
        {
          title: '50% Viscose',
          text: '(from renewable, plant-based cellulose sources)',
        },
        {
          title: '50% Polyester',
          text:
            '(may include GRS-certified recycled content depending on production batch)',
        },
      ],
      listClassName: 'ml-[15px]',
      itemClassName: 'ml-0',
    },
  },
  {
    id: 'materials-details',
    type: 'details',
    column: 2,
    props: {
      items: [
        { label: 'Release', value: '2024' },
        { label: 'Version', value: 'BLACK' },
        {
          label: 'Fiber Composition',
          value: '50% Viscose / 50% Polyester',
        },
        {
          label: 'Cut',
          value:
            'Minimalist design intended for everyday and semi-formal use',
        },
        { label: 'Silhouette', value: 'Straight silhouette' },
        {
          label: 'Style',
          value:
            'Lightweight construction for optimal comfort and functionality',
        },
      ],
    },
  },
];

// ----------------------------------------------------------------------------------------

export const designDetailsBlocks: BlockConfig[] = [
  {
    id: 'design-image',
    type: 'image',
    column: 2, // imagePosition="right"
    props: {
      src: '/images/16.jpg',
      alt: 'Design Details',
      className: 'w-full object-cover h-[340px]',
    },
  },
  {
    id: 'design-title',
    type: 'title',
    column: 1,
    props: {
      children: 'Design Details',
      className: 'text-3xl md:text-4xl lg:text-5xl font-bold',
    },
  },
  {
    id: 'design-bullets',
    type: 'bullets',
    column: 1,
    props: {
      items: [
        { text: 'No glued layers, no lining, or complex composites' },
        { text: 'No unusual closures, laminates, or irreversible bonding' },
        { text: 'All elements such as trims and tags are accessible and removable' },
        { text: 'Lightweight, mono-material blend facilitates end-of-life sorting and recycling' },
        { text: 'Folded and packed in a biodegradable envelope-style box made from FSC-certified recycled paper' },
        { text: 'Packaging supplied by MoldPack S.R.L., Chișinău, Moldova' },
      ],
    },
  },
];

// ----------------------------------------------------------------------------------------

export const careInstructionBlocks: BlockConfig[] = [
  {
    id: 'care-image',
    type: 'image',
    column: 1, // imagePosition="left"
    props: {
      src: '/images/05.jpg',
      alt: 'Care Instruction',
      className: 'w-full object-cover h-[340px]',
    },
  },
  {
    id: 'care-title',
    type: 'title',
    column: 2,
    props: {
      children: 'Care Instruction',
      className: 'text-3xl md:text-4xl lg:text-5xl font-bold',
    },
  },
  {
    id: 'care-bullets',
    type: 'bullets',
    column: 2,
    props: {
      items: [
        { text: 'Do not bleach' },
        { text: 'Do not tumble dry' },
        { text: 'Iron at medium temperature, 15°C' },
        { text: 'Do not dry clean' },
        { text: 'Wash with similar colors at 30°C' },
      ],
    },
  },
];

// ----------------------------------------------------------------------------------------


export const garmentCareBlocks: BlockConfig[] = [
  {
    id: 'garment-image',
    type: 'image',
    column: 2, // imagePosition="right"
    props: {
      src: '/images/06.jpg',
      alt: 'Garment care and repair guides',
      className: 'w-full object-cover h-[340px]',
    },
  },
  {
    id: 'garment-title',
    type: 'title',
    column: 1,
    props: {
      children: 'Garment care and repair guides',
      className: 'text-3xl md:text-4xl lg:text-5xl font-bold',
    },
  },
  {
    id: 'garment-content',
    type: 'content',
    column: 1,
    props: {
      className: 'space-y-[32px]',
      children: (
        <>
          <p>
            Light steaming or ironing may be used to restore the garment’s original appearance.
          </p>
          <p>Air drying recommended.</p>
          <p>
            Full care instructions are provided both on the product label and digitally via QR code.
          </p>
        </>
      ),
    },
  },
];

// ----------------------------------------------------------------------------------------

export const manufacturerBlocks: BlockConfig[] = [
  {
    id: 'manufacturer-content',
    type: 'content',
    column: 1,
    props: {
      className: 'flex flex-col lg:flex-row gap-4',
      children: (
        <>
          <div className="flex-1">
            <p className="font-Bold lg:text-[50px] lg:leading-[60px]">Manufacturer:</p>
            <p className="text-[19px] leading-[22.8px] mt-[28px]">
              Manufactured by: SC ALLERT & CO SRL<br />
              IDNO: 1005600017882
            </p>
          </div>
          <div className="max-w-[490px] flex-1">
            <p className="font-Bold lg:text-[50px] lg:leading-[60px]">Country of Origin:</p>
            <p className="text-[19px] leading-[22.8px] mt-[28px]">
              Str. Tighina 12, Chișinău, MD-2001, Republic of Moldova
            </p>
          </div>
        </>
      ),
    },
  },
];

// ----------------------------------------------------------------------------------------

export const howItsMadeBlocks: BlockConfig[] = [
  {
    id: 'how-made-title',
    type: 'title',
    column: 1,
    props: {
      children: 'How its made',
      className: 'text-3xl md:text-4xl lg:text-5xl font-bold',
    },
  },
  {
    id: 'how-made-list',
    type: 'made',
    column: 1,
    props: {
      items: [
        {
          componentProcess: 'Fabric weaving and dyeing',
          supplier: 'Textile Mills S.R.L.',
          country: 'Moldova',
        },
        {
          componentProcess: 'Cutting and sewing',
          supplier: 'Tailoring Studio S.R.L.',
          country: 'Moldova',
        },
        {
          componentProcess: 'Quality control and finishing',
          supplier: 'Quality Check S.R.L.',
          country: 'Moldova',
        },
      ],
    },
  },
];

// ----------------------------------------------------------------------------------------

export const davarisTextilesBlocks: BlockConfig[] = [
  {
    id: 'davaris-image',
    type: 'image',
    column: 2, // imagePosition="right"
    props: {
      src: '/images/07.jpg',
      alt: 'Davaris Textiles',
      className: 'w-full object-cover h-[345px]',
    },
  },
  {
    id: 'davaris-title',
    type: 'title',
    column: 1,
    props: {
      children: 'Davaris Textiles',
      className: 'text-3xl md:text-4xl lg:text-5xl font-bold',
    },
  },
  {
    id: 'davaris-content',
    type: 'content',
    column: 1,
    props: {
      className: 'space-y-[32px]',
      children: (
        <>
          <p>
            Davaris Textiles has been recognized with some of the most significant industry awards and certificates, including GRS (Global Recycled Standard), GOTS (Global Organic Textile Standard) and BCI (Better Cotton Initiative). Our product range includes multiple categories of fabrics which are valid under the Oekotex standard.
          </p>
          <p>
            Sustainability is now a business imperative, and we must all act in order to drive change.
          </p>
        </>
      ),
    },
  },
];

// ----------------------------------------------------------------------------------------

export const otherUsefulInfoBlocks: BlockConfig[] = [
  {
    id: 'useful-info-title',
    type: 'title',
    column: 1,
    props: {
      children: 'Other Useful Information',
      className: 'text-3xl md:text-4xl lg:text-5xl font-bold',
    },
  },
  {
    id: 'useful-info-bullets',
    type: 'bullets',
    column: 1,
    props: {
      items: [
        {
          text: 'Eligible for the Julia Allert Trade-In program: customers can return the dress and receive a discount on future purchases. Returned dresses are donated or repurposed into accessories such as sleep masks.',
        },
        {
          text: 'Made with long-term durability in mind and supports circular fashion principles.',
        },
        {
          text: 'Does not contain any substances of concern as per Regulation (EU) 2024/1781, including those associated with carcinogenicity, mutagenicity, reproductive toxicity, endocrine disruption, aquatic toxicity, or bioaccumulation.',
        },
        {
          text: 'Polyester component may include GRS-certified recycled fibers; viscose is renewable and plant-derived.',
        },
        {
          text: 'Efficient material use through minimalist cutting patterns and mono-fabric composition.',
        },
        {
          text: 'No pre-used or refurbished components are included, but returned items are reused as part of the brand’s sustainability initiative.',
        },
        {
          text: 'Compatible with mixed fiber mechanical recycling processes.',
        },
        {
          text: 'Functional for daily use; retains color and shape through normal wear and washing cycles.',
        },
      ],
    },
  },
];

// ----------------------------------------------------------------------------------------

export const environmentalFootprintBlocks: BlockConfig[] = [
  {
    id: 'footprint-image',
    type: 'image',
    column: 2, // imagePosition="right"
    props: {
      src: '/images/12.jpg',
      alt: 'Environmental & Climate Footprint Highlights',
      className: 'w-full object-cover h-[535px]',
    },
  },
  {
    id: 'footprint-title',
    type: 'title',
    column: 1,
    props: {
      children: 'Environmental & Climate Footprint Highlights',
      className: 'text-3xl md:text-4xl lg:text-5xl font-bold',
    },
  },
  {
    id: 'footprint-bullets',
    type: 'bullets',
    column: 1,
    props: {
      items: [
        {
          text: 'No on-site dyeing or washing; low water consumption limited to essential needs',
        },
        {
          text: 'Energy-efficient sewing machines used',
        },
        {
          text: 'Packaging is compact, plastic-free, recyclable or recycled',
        },
        {
          text: 'Lightweight construction reduces material use and shipping impact',
        },
        {
          text: 'Participates in DHL’s GoGreen carbon tracking and offsetting program',
        },
      ],
    },
  },
];

// ----------------------------------------------------------------------------------------

export const twoColBulletsBlocks: BlockConfig[] = [
  {
    id: 'bullets-left',
    type: 'bullets',
    column: 1,
    props: {
      items: [
        {
          text: 'No on-site dyeing or washing; low water consumption limited to essential needs',
        },
        { text: 'Energy-efficient sewing machines used' },
        {
          text: 'Packaging is compact, plastic-free, recyclable or recycled',
        },
        {
          text: 'Lightweight construction reduces material use and shipping impact',
        },
        {
          text: 'Participates in DHL’s GoGreen carbon tracking and offsetting program',
        },
      ],
    },
  },
  {
    id: 'bullets-right',
    type: 'bullets',
    column: 2,
    props: {
      items: [
        { title: 'Care & Longevity' },
        { text: 'Care Instructions: cold wash, air dry, light steam.' },
        { text: 'Repair Guide: how to mend small tears or replace buttons.' },
        {
          text:
            'Dry Cleaning: for delicate or structured items, professional dry cleaning is recommended',
        },
        { text: 'Well-cared garments live longer and stay beautiful.' },
      ],
    },
  },
];

// ----------------------------------------------------------------------------------------

export const certificationsComplianceBlocks: BlockConfig[] = [
  {
    id: 'certifications-compliance-content',
    type: 'content',
    column: 1,
    props: {
      className: 'flex flex-col lg:flex-row gap-4',
      children: (
        <>
          {/* Left column: Certifications */}
          <div className="flex-1">
            <p className="font-Bold lg:text-[50px] lg:leading-[51px]">
              Certifications (Supplier: Davaris Textiles S.A.):
            </p>
            <p className="text-[19px] leading-[22.8px] mt-[28px]">
              GRS (Global Recycled Standard)
            </p>
            <p className="text-[19px] leading-[22.8px]">
              GOTS (Global Organic Textile Standard)
            </p>
            <p className="text-[19px] leading-[22.8px]">
              OEKO-TEX® Standard 100
            </p>
            <p className="text-[19px] leading-[22.8px]">
              ISO 9001 (Quality Management)
            </p>
            <p className="text-[19px] leading-[22.8px]">
              ISO 14001 (Environmental Management, where applicable)
            </p>
            <div className="w-full h-[1px] bg-[#9D9D9C] mt-[30px]"></div>
            <p className="text-[19px] leading-[22.8px] mt-[28px]">
              Full supplier and safety documentation (e.g., MSDS for dyes/finishes) available.
            </p>
            <p className="text-[19px] leading-[22.8px]">
              No user risks associated with wearing or maintaining the garment.
            </p>
            <p className="text-[19px] leading-[22.8px]">
              No special consumables required beyond basic household laundry supplies.
            </p>
            <img
              src="/images/08.png"
              alt="Certification Logos"
              className="mt-[20px] w-full h-auto max-h-[200px]"
            />
          </div>

          {/* Right column: Compliance */}
          <div className="max-w-[490px] flex-1">
            <p className="font-Bold lg:text-[50px] lg:leading-[51px]">
              Compliance & Legal Identifiers
            </p>
            <p className="text-[19px] leading-[22.8px] mt-[28px]">
              GTIN: Auto-generated on platform.
            </p>
            <p className="text-[19px] leading-[22.8px]">
              TARIC Code: 6104 43 00 – Women’s dresses of synthetic fibers, knitted or crocheted.
            </p>
            <p className="text-[19px] leading-[22.8px]">
              Complies with EU Regulation (EU) No 1007/2011 – textile labelling.
            </p>
            <img
              src="/images/13.jpg"
              alt="Certification Logos"
              className="mt-[20px] w-full h-auto max-h-[200px]"
            />
          </div>
        </>
      ),
    },
  },
];

// ----------------------------------------------------------------------------------------

export const logisticsAndManufacturingBlocks: BlockConfig[] = [
  // Left Title
  {
    id: 'carbon-logistics-title',
    type: 'title',
    column: 1,
    props: {
      children: 'Carbon-Neutral Logistics Julia Allert x DHL GoGreen',
      className: 'text-3xl md:text-4xl lg:text-5xl font-bold',
    },
  },
  // Right Title
  {
    id: 'partner-manufacturing-title',
    type: 'title',
    column: 2,
    props: {
      children: 'Partner Manufacturing: Mobile SRL Moldova',
      className: 'text-3xl md:text-4xl lg:text-5xl font-bold',
    },
  },

  // Left Content
  {
    id: 'carbon-logistics-content',
    type: 'content',
    column: 1,
    props: {
      className: 'space-y-[2px]',
      children: (
        <>
          <p>All Julia Allert shipments are delivered through DHL’s</p>
          <p>GoGreen Program — ensuring carbon-neutral international logistics.</p>
          <p>
            We proudly receive a yearly certificate confirming the compensation of transport- related CO₂ emissions through certified climate protection projects.
          </p>
        </>
      ),
    },
  },

  // Right Content
  {
    id: 'partner-manufacturing-content',
    type: 'content',
    column: 2,
    props: {
      className: 'space-y-[2px]',
      children: (
        <>
          <p>
            Julia Allert collaborates with Mobile SRL, a trusted partner production facility based in Moldova.
          </p>
          <p>
            This collaboration ensures high standards in quality, safety, ethics, and sustainability throughout the manufacturing process.
          </p>
        </>
      ),
    },
  },

  // Left Bullets
  {
    id: 'carbon-logistics-bullets',
    type: 'bullets',
    column: 1,
    props: {
      items: [
        { text: 'Official GoGreen Participant' },
        { text: 'Annual DHL Certificate of Emission Offset' },
        { text: 'Logistics that respect the planet' },
      ],
    },
  },

  // Right Bullets
  {
    id: 'partner-certifications-bullets',
    type: 'bullets',
    column: 2,
    props: {
      items: [
        { title: 'Production Certifications:' },
        { text: 'ISO 9001 — Quality Management System' },
        { text: 'ISO 14000 — Environmental Management' },
        { text: 'ISO 45000 — Occupational Health & Safety' },
        {
          text: 'SMETA Audit — Ethical Manufacturing Audit (essential for B2B transparency)',
        },
        {
          noBulletText:
            'Reliable production. Certified standards. Shared values.',
        },
      ],
    },
  },

  // Recycling Left
  {
    id: 'recycling-left',
    type: 'recycling',
    column: 1,
    props: {
      children: (
        <div className="flex gap-[15px]">
          <img
            src="/images/mark1.png"
            alt="mark1"
            className="w-[71px] h-[69px]"
          />
          <div>
            <p className="font-Bold text-[19px] leading-[22.8px]">
              Trade-in program:
            </p>
            <p>
              Customers can return used Julia Allert items and receive credit toward new purchases.
            </p>
          </div>
        </div>
      ),
    },
  },

  // Recycling Right
  {
    id: 'recycling-right',
    type: 'recycling',
    column: 2,
    props: {
      children: (
        <div className="flex gap-[15px]">
          <img
            src="/images/heart.png"
            alt="heart"
            className="w-[68px] h-[57px]"
          />
          <div>
            <p className="font-Bold text-[19px] leading-[22.8px]">
              Charity Collaboration with Shop Mesto:
            </p>
            <p>
              Gently worn pieces are donated to Shop Mesto, supporting women in
              need and promoting mindful reuse.
            </p>
            <p>Nothing truly beautiful ever.</p>
          </div>
        </div>
      ),
    },
  },
];