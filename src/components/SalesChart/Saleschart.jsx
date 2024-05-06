import React, { PureComponent } from "react";
import {BarChart, XAxis, Bar, Cell, ResponsiveContainer,Legend} from "recharts";
import './Saleschart.css'

const getCustomShapePath = (x, y, width, height, borderRadius) => {
  const radius = borderRadius || 5; // Default border radius
  
  // Halve the width
  const halfWidth = width / 2;
  
  const path = `
    M${x + radius},${y}
    L${x + halfWidth - radius},${y}
    Q${x + halfWidth},${y} ${x + halfWidth},${y + radius}
    L${x + halfWidth},${y + height - radius}
    Q${x + halfWidth},${y + height} ${x + halfWidth - radius},${y + height}
    L${x + radius},${y + height}
    Q${x},${y + height} ${x},${y + height - radius}
    L${x},${y + radius}
    Q${x},${y} ${x + radius},${y}
    Z
  `;
  
  return path;
};

const CustomShape = (props) => {
  const {
    fill, x, y, width, height,
  } = props;

  const halfWidth = width / 2;

  return <path d={getCustomShapePath(x, y, halfWidth, height)} stroke="none" fill={fill} />;
};

const SalesChart = ({ sold_products }) => {
  const maxSoldQuantity = Math.max(...sold_products.map((item) => item.sold_quantity));

  return (
    <ResponsiveContainer className="chart" width="74%" height="25%">
      <BarChart width={30} height={20} data={sold_products}>
        <XAxis dataKey="product_name" axisLine={false} tick={true} />
        <Bar dataKey="sold_quantity" fill="rgba(117, 25, 235, 0.3)" shape={<CustomShape />}>
          {sold_products.slice(0,6).map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              cursor="pointer"
              fill={entry.sold_quantity === maxSoldQuantity ? '#7519EB' : 'rgba(117, 25, 235, 0.3)'}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SalesChart;

// const maxUV = Math.max(...data.map((item) => item.uv));

// export default class SalesChart extends PureComponent {
//   static demoUrl = "https://codesandbox.io/s/tiny-bar-chart-35meb";

//   render() {
//     return (
     
//       <ResponsiveContainer className="chart" width="74%" height="25%">
//         <BarChart width={30} height={40} data={data}>
//           <XAxis dataKey="name" axisLine={false} tick={true} />
          
//           <Bar dataKey="uv" fill="rgba(117, 25, 235, 0.3)" shape={<CustomShape />}>
//             {data.map((entry, index) => (
//               <Cell
//                 key={`cell-${index}`}
//                 cursor="pointer"
//                 fill={entry.uv === maxUV ? '#7519EB' : 'rgba(117, 25, 235, 0.3)'}
//               />
//             ))}
//           </Bar>
          
//         </BarChart>
//       </ResponsiveContainer>
      
//     );
//   }
// }
