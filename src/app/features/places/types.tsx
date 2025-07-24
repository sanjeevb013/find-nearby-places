export interface Place {
  fsq_place_id: string;
  name: string;
  latitude: number;
  longitude: number;
  categories: {
    fsq_category_id: string;
    name: string;
    short_name: string;
    plural_name: string;
    icon: {
      prefix: string;
      suffix: string;
    };
  }[];
  location: {
    address?: string;
    locality?: string;
    region?: string;
    postcode?: string;
    country?: string;
    formatted_address?: string;
  };
  distance: number;
  tel?: string;
  website?: string;
  link?: string;
  date_created?: string;
  date_refreshed?: string;
  extended_location?: Record<string, unknown>;
  placemaker_url?: string;
  related_places?: {
    parent?: {
      fsq_place_id: string;
      name: string;
      categories: {
        fsq_category_id: string;
        name: string;
        short_name: string;
        plural_name: string;
        icon: {
          prefix: string;
          suffix: string;
        };
      }[];
    };
  };
  social_media?: {
    facebook_id?: string;
    instagram?: string;
    twitter?: string;
  };
  chains?: {
    fsq_chain_id: string;
    name: string;
  }[];
  email?: string;
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