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

export interface PlaceDetails {
  fsq_id: string;
  name: string;
  timezone: string;
  link: string;
  closed_bucket: string;

  categories: {
    id: number;
    name: string;
    short_name: string;
    plural_name: string;
    icon: {
      prefix: string;
      suffix: string;
    };
  }[];

  chains: {
    id: string;
    name: string;
  }[];

  geocodes: {
    main: {
      latitude: number;
      longitude: number;
    };
    roof?: {
      latitude: number;
      longitude: number;
    };
  };

  location: {
    address?: string;
    country: string;
    formatted_address: string;
    locality?: string;
    postcode?: string;
    region?: string;
  };

  related_places?: Record<string, unknown>; // empty object in your example
}