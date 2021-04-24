export interface Product {
  id?:string,
  _id?: string;
  sku: string;
  title: string;
  description: string;
  // img: string;
  images : {
    main: string,
    catalog: Array<string>
  },
  manufacture_details: {
    model_number: string,
    release_date: Date
  },
  shipping_details: {
    weight: number,
    width: number,
    height: number,
    depth: number
  },
  quantity: number,

  pricing: {
    price: number,
    oldPrice?: number
  },
  variations: Array<{
      type: string,
      name: string,
      values: Array<string>
    }>,


  variation_quantity : [

  ],
  categories: Array<string>
  // variationType: string;
  // variations: Array<string>;
  // category: string;
  // price: number;
  // oldPrice? : number;
  outofStock: boolean;
  // colors?: Array<string>
}








