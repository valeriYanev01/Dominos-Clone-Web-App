export type Address = {
  apartament: string;
  closestStore?: string;
  block: string;
  coordinates: [number, number];
  doorBell: string;
  entrance: string;
  fullAddress: string;
  name: string;
  phoneNumber: string;
  store?: string;
  _id?: string;
  address?: {
    apartament: string;
    closestStore: string;
    store: string,
    block: string;
    coordinates: [number, number];
    doorBell: string;
    entrance: string;
    fullAddress: string;
    name: string;
    phoneNumber: string;
    _id: string;
  }
};