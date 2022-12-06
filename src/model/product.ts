interface Product {
  category:{
    id:number,
    image:string,
    name:string
  },
  description:string,
  id:string,
  images:Img,
  price:number
  quantity:number,
  title:string,
  total:number
}

interface Img {
  [index: number]:string;
}


export {Product,Img}
