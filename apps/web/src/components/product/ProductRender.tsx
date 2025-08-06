import React from 'react';

export type BlockType =
  | 'title'
  | 'content'
  | 'image'
  | 'bullets'
  | 'details'
  | 'made'
  | 'recycling';

export interface BlockConfig {
  /** unique key for React */
  id: string;
  /** which renderer to use */
  type: BlockType;
  /** 1‑based column index */
  column?: number;
  /** props passed to that renderer */
  props: any;
}

export interface ProductRenderProps {
  /** number of columns (defaults to 2) */
  columns?: number;
  /** extra classes on the outer <section> */
  containerClassName?: string;
  /** override the grid template (e.g. "md:grid-cols-[2fr,3fr]") */
  gridTemplateClass?: string;
  /** sequence of blocks (order + column) */
  blocks: BlockConfig[];
}

const ProductRender: React.FC<ProductRenderProps> = ({
  columns = 2,
  containerClassName = '',
  gridTemplateClass,
  blocks,
}) => {
  // group by column
  const cols = Array.from({ length: columns }, (_, i) =>
    blocks.filter((b) => (b.column ?? 1) === i + 1)
  );

  const gridClass =
    gridTemplateClass ||
    `mt-[100px] grid grid-cols-1 md:grid-cols-${columns} gap-8 items-start`;

  return (
    <section className={`${gridClass} ${containerClassName}`}>
      {cols.map((colBlocks, i) => (
        <div key={i} className="space-y-6">
          {colBlocks.map((block) => {
            const { id, type, props } = block;

            switch (type) {
              case 'title':
                return <h2 key={id} {...props} />;
              case 'content':
                return <div key={id} {...props} />;
              case 'image':
                return (
                  <div key={id} className="flex justify-center">
                    <img {...props} />
                  </div>
                );
              case 'bullets': {
                const items = props.items || [];
                return (
                  <ul key={id} className="list-disc list-inside space-y-2">
                    {items.map((b: any, idx: number) => (
                      <li key={idx}>
                        {b.title && <strong>{b.title}</strong>} {b.text}
                      </li>
                    ))}
                  </ul>
                );
              }
              case 'details': {
                const items = props.items || [];
                return (
                  <dl key={id} className="divide-y divide-gray-200">
                    {items.map((d: any) => (
                      <div
                        key={d.label}
                        className="py-4 flex flex-col sm:flex-row sm:items-start sm:space-x-4"
                      >
                        <dt className="font-medium sm:min-w-[150px]">
                          {d.label}
                        </dt>
                        <dd className="mt-1 sm:mt-0 bg-[#ffd8da]">{d.value}</dd>
                      </div>
                    ))}
                  </dl>
                );
              }
              case 'made': {
                const items = props.items || [];
                return (
                  <div key={id}>
                    {items.map((m: any, idx: number) => (
                      <div
                        key={idx}
                        className="py-6 grid grid-cols-1 md:grid-cols-2 gap-4 divide-x divide-gray-200"
                      >
                        <div className="text-gray-500 space-y-2">
                          <p className="font-medium">Component/ Process</p>
                          <p className="font-medium">Supplier</p>
                          <p className="font-medium">Country</p>
                        </div>
                        <div className="text-gray-900 space-y-2">
                          <p className='bg-[#ffd8da]'>{m.componentProcess}</p>
                          <p className='bg-[#ffd8da]'>{m.supplier}</p>
                          <p className='bg-[#ffd8da]'>{m.country}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              }
              case 'recycling':
                return <div key={id} {...props} />;
              default:
                return null;
            }
          })}
        </div>
      ))}
    </section>
  );
};

export default ProductRender;
