export interface Place {
  fsq_id: string;
  name: string;
  location: {
    address?: string;
    locality?: string;
    region?: string;
  };
  geocodes: {
    main: {
      latitude: number;
      longitude: number;
    };
  };
  categories: {
    id: number;
    name: string;
    icon: {
      prefix: string;
      suffix: string;
    };
  }[];
  rating?: number;
  distance: number;
}
