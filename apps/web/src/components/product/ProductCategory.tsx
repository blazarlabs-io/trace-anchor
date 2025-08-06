import React from 'react';

export interface DetailItem {
  label: string;
  value: React.ReactNode;
}

export interface BulletItem {
  /** Main bullet text */
  title?: React.ReactNode;
  /** Optional description under the title */
  text?: React.ReactNode;
  noBulletText?: React.ReactNode; // For cases where no bullet is needed
}

export interface MadeItem {
  /** Description of the component or process */
  componentProcess: React.ReactNode;
  /** Supplier name or description */
  supplier: React.ReactNode;
  /** Country of origin for this component/process */
  country: React.ReactNode;
}

export interface ProductSectionProps {
  /** URL of the product image */
  imageSrc?: string;
  /** Alternate text for the image */
  alt?: string;
  /** Width of the image (e.g. 250 or '250px') */
  imageWidth?: number | string;
  /** Height of the image (e.g. 550 or '550px') */
  imageHeight?: number | string;
  /** Main title or heading for this section */
  title?: string;
  titleLeft?: string;
  titleRight?: string;
  /** Free-form content (paragraphs, headings, lists, etc.) */
  content?: React.ReactNode;
  contentLeft?: React.ReactNode;
  contentRight?: React.ReactNode;
  contentClassName?: string;
  /** Structured details rendered as a table/definition list */
  details?: DetailItem[];
  /** Made/process blocks showing component, supplier, and country */
  made?: MadeItem[];
  /** Simple bulleted list items */
  bullets?: BulletItem[];
  /** Optional position for bullets: 'left' or 'right' */
  bulletsPosition?: 'left' | 'right';
  bulletsLeft?: BulletItem[];
  bulletsRight?: BulletItem[];
  bulletsClassName?: string;
  bulletsContentClassName?: string; // CSS classes for the bullet content
  bulletsTextClassName?: string; // CSS classes for the bullet content text
  // SupportiveRecycling 
  RecyclingLeft?: React.ReactNode;
  RecyclingRight?: React.ReactNode;
  /** Layout: 'left' = image on left, 'right' = image on right */
  imagePosition?: 'left' | 'right';
  /** Optional CSS classes for outer container */
  containerClassName?: string;
}

/**
 * A flexible product/detail section that supports an optional image, title,
 * free-form content, and structured details. Layout switches based on
 * `imagePosition`, and on small screens always stacks in a single column.
 */
const ProductCategory: React.FC<ProductSectionProps> = ({
  imageSrc,
  alt,
  imageWidth,
  imageHeight,
  title,
  titleLeft,
  titleRight,
  content,
  contentLeft,
  contentRight,
  contentClassName,
  bullets,
  bulletsLeft,
  bulletsRight,
  bulletsClassName = 'flex-row items-center',
  bulletsContentClassName,
  bulletsTextClassName = 'ml-5',
  details,
  RecyclingLeft,
  RecyclingRight,
  made,
  imagePosition = 'right',
  containerClassName = 'mt-[100px] grid grid-cols-1 md:grid-cols-2 gap-8 items-start'
}) => {
  // determine grid order classes
  const isImageLeft = imagePosition === 'left';
  const imageOrder = isImageLeft ? 'order-1' : 'order-2';
  const textOrder = isImageLeft ? 'order-2' : 'order-1';

  return (
    <section className={`${containerClassName}`}>      
      {/* Image Block */}
      {imageSrc && (
        <div className={`flex justify-center ${imageOrder}`}>
          <img
            src={imageSrc}
            alt={alt || ''}
            className={`object-cover w-full ${imageHeight}`}
          />
        </div>
      )}

      {/* Textual Content Block */}
      <div className={`space-y-6 ${textOrder} ${contentClassName}`}>
        {/* Title */}
        
        {title && (
          <header className="space-y-2">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              {title}
            </h2>
          </header>
        )}
        {/* Title */}
        {(titleLeft || titleRight) && (
          <header className="grid grid-cols-2 gap-6">
            {titleLeft && (
              <div className="space-y-2">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                  {titleLeft}
                </h2>
              </div>
            )}
            {titleRight && (
              <div className="space-y-2">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                  {titleRight}
                </h2>
              </div>
            )}
          </header>
        )}

        {/* Free-form Content */}
        {content && <div className="prose max-w-none">{content}</div>}
        {/* Two-column content layout */}
        {(contentLeft || contentRight) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-[70px]">
            {contentLeft && <div className="prose max-w-none">{contentLeft}</div>}
            {contentRight && <div className="prose max-w-none">{contentRight}</div>}
          </div>
        )}

        {/* Bulleted List */}
        {bullets && bullets.length > 0 && (
          <ul className={`list-disc list-inside`}>
            {bullets.map(({ title: bulletTitle, text }, idx) => (
              <div key={idx} className={`flex ${bulletsClassName} my-[10px]`}>
                {text && <div className='w-[6px] h-[6px] rounded-[3px] bg-black'></div>}
                <div className={`${bulletsContentClassName}`}>
                  {bulletTitle && (
                    <p className="font-Bold text-[19px] leading-[22.8px]">{bulletTitle}</p>
                  )}
                  {text && (
                    <p className={`${bulletsTextClassName} mt-1 text-gray-700`}>{text}</p>
                  )}
                </div>
              </div>
            ))}
          </ul>
        )}

        {/* Two col bullets */}
        {(bulletsLeft || bulletsRight) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bulletsLeft && bulletsLeft.length > 0 && (
              <ul className="list-disc list-inside">
                {bulletsLeft.map(({ title, text }, idx) => (
                  <div key={`left-${idx}`} className="flex flex-row items-center my-[10px]">
                    {text && <div className='w-[6px] h-[6px] rounded-[3px] bg-black'></div> }
                    {title && <p className="font-Bold text-[19px] leading-[22.8px]">{title}</p>}
                    {text && <p className="ml-5 mt-1 text-gray-700">{text}</p>}
                  </div>
                ))}
              </ul>
            )}
            {bulletsRight && bulletsRight.length > 0 && (
              <ul className="list-disc list-inside">
                {bulletsRight.map(({ title, text, noBulletText }, idx) => (
                  <div key={`right-${idx}`} className="flex flex-row items-center my-[10px]">
                    {text && <div className='w-[6px] h-[6px] rounded-[3px] bg-black'></div> }
                    {title && <p className="font-Bold text-[19px] leading-[22.8px]">{title}</p>}
                    {text && <p className="ml-5 mt-1 text-gray-700">{text}</p>}
                    { noBulletText && <p className="">{noBulletText}</p> }
                  </div>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Made/Process Blocks */}
        {made && made.length > 0 && (
          <div className="">
            {made.map(({ componentProcess, supplier, country }, idx) => (
              <div key={idx} className="py-6 grid grid-cols-1 md:grid-cols-2 gap-4 divide-x divide-gray-200 m-auto md:w-[533px]">
                {/* Labels Column */}
                <div className="text-gray-500 space-y-2">
                  <p className="font-medium">Component/ Process</p>
                  <p className="font-medium">Supplier</p>
                  <p className="font-medium">Country</p>
                </div>
                {/* Values Column */}
                <div className="text-gray-900 space-y-2">
                  <p className='bg-[#ffd8da]'>{componentProcess}</p>
                  <p className='bg-[#ffd8da]'>{supplier}</p>
                  <p className='bg-[#ffd8da]'>{country}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Details Table/List */}
        {details && details.length > 0 && (
          <dl className="divide-y divide-gray-200">
            {details.map(({ label, value }) => (
              <div
                key={label}
                className="py-4 flex flex-col sm:flex-row sm:items-start sm:space-x-4"
              >
                <dt className="font-medium text-black sm:min-w-[150px] inline-block">
                  {label}
                </dt>
                <dd className="text-black font-DemiBold mt-1 sm:mt-0">{value}</dd>
              </div>
            ))}
          </dl>
        )}

        {/* Recycling */}
        {(RecyclingLeft || RecyclingRight) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-[70px]">
            {RecyclingLeft && <div className="prose max-w-none">{RecyclingLeft}</div>}
            {RecyclingRight && <div className="prose max-w-none">{RecyclingRight}</div>}
          </div>
        )}

      </div>
    </section>
  );
};

export default ProductCategory;
