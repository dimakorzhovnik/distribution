import {
  a,
  b,
  c,
  d,
  a_3d_plot,
  b_3d_plot,
  c_3d_plot,
  d_3d_plot
} from './config';
import { x, y, z } from './list';

// const formatNumber = (number, toFixed) => {
//   let formatted = +number;

//   if (toFixed) {
//     formatted = +formatted.toFixed(toFixed);
//   }

//   return formatted.toLocaleString('en').replace(/,/g, ' ');
// };

// const roundNumber = (num, scale) => {
//   if (!`${num}`.includes('e')) {
//     return +`${Math.floor(`${num}e+${scale}`)}e-${scale}`;
//   }
//   const arr = `${num}`.split('e');
//   let sig = '';
//   if (+arr[1] + scale > 0) {
//     sig = '+';
//   }
//   const i = `${+arr[0]}e${sig}${+arr[1] + scale}`;
//   const j = Math.floor(i);
//   const k = +`${j}e-${scale}`;
//   return k;
// };

const getShares = atoms => {
  const shares =
    a_3d_plot +
    b_3d_plot * atoms -
    c_3d_plot * atoms ** 2 +
    d_3d_plot * atoms ** 3;
  return shares;
};

const getDiscountPlot = atoms => {
  const discount = 0.00005 * atoms;
  return discount;
};

const getDataPlot = atoms => {
  let data = {
    y: [],
    x: [],
    z: []
  };
  const indexArr = y.indexOf(Math.floor(atoms / 1000) * 1000);
  const newArrY = y.slice(0, indexArr + 1);
  const newArrX = x.slice(0, indexArr + 1);
  const newArrZ = z.slice(0, indexArr + 1);
  data = {
    x: newArrX,
    y: newArrY,
    z: newArrZ
  };
  data.x.push(getShares(atoms));
  data.y.push(atoms);
  data.z.push(getDiscountPlot(atoms));
  return data;
};

const getEstimation = (price, discount, atoms, value) => {
  const estimation =
    price * value +
    ((price * discount) / 2) * value -
    ((price * discount) / (2 * atoms)) * Math.pow(value, 2);
  return estimation;
};

const funcDiscount = atom => {
  const discount = (5 / Math.pow(10, 7)) * atom;
  return discount;
};

const cybWon = atom => {
  const won = a * Math.pow(atom, 3) + b * Math.pow(atom, 2) + c * atom + d;
  return won;
};

const getRewards = (price, discount, atoms, amount) => {
  const rewards =
    price + (price * discount) / 2 - ((price * discount) / atoms) * amount;
  return rewards;
};

export {
  cybWon,
  funcDiscount,
  getEstimation,
  getShares,
  getDataPlot,
  getRewards
};
