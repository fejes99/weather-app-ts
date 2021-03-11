class F {
  readonly __tag = 'F';
  constructor(public val: number) {}
}

class K {
  readonly __tag = 'K';
  constructor(public val: number) {}
}

class C {
  readonly __tag = 'C';
  constructor(public val: number) {}
}

export const mkF = (val: number) => {
  return new F(val);
};

export const mkC = (val: number) => {
  return new C(val);
};

export const mkK = (val: number) => {
  return new K(val);
};

export type TemperatureT = C | K | F;
type TemperatureTags = TemperatureT['__tag'];

type convertTempT = (temp: TemperatureT, convertTo: TemperatureTags) => TemperatureT;
export const convertTemp: convertTempT = (temp, convertTo) => {
  switch (temp.__tag) {
    case 'C': {
      switch (convertTo) {
        case 'C':
          console.log(`Convert ${temp.val} ${temp.__tag} to C`);
          return mkC(temp.val);
        case 'K':
          console.log(`Convert ${temp.val} ${temp.__tag} to K`);
          return mkK(temp.val + 273.15);
        case 'F':
          console.log(`Convert ${temp.val} ${temp.__tag} to F`);
          return mkF((temp.val * 9) / 5 + 32);
      }
      break;
    }
    case 'F': {
      switch (convertTo) {
        case 'C':
          console.log(`Convert ${temp.val} ${temp.__tag} to C`);
          return mkC(((temp.val - 32) * 5) / 9);
        case 'K':
          console.log(`Convert ${temp.val} ${temp.__tag} to K`);
          return mkK(((temp.val - 32) * 5) / 9 + 273.15);
        case 'F':
          console.log(`Convert ${temp.val} ${temp.__tag} to F`);
          return mkF(temp.val);
      }
      break;
    }
    case 'K': {
      switch (convertTo) {
        case 'C':
          console.log(`Convert ${temp.val} ${temp.__tag} to C`);
          return mkC(temp.val - 273.15);
        case 'K':
          console.log(`Convert ${temp.val} ${temp.__tag} to K`);
          return mkK(temp.val);
        case 'F':
          console.log(`Convert ${temp.val} ${temp.__tag} to F`);
          return mkF(((temp.val - 273.15) * 9) / 5 + 32);
      }
      break;
    }
  }
};
