export interface RacingData {
  next_to_go_ids: string[];
  race_summaries: Record<string, RaceSummary>;
}

export interface RaceSummary {
  race_id: string;
  race_name: string;
  race_number: number;
  meeting_id: string;
  meeting_name: string;
  category_id: string;
  advertised_start: AdvertisedStart;
  race_form: RaceForm;
  venue_id: string;
  venue_name: string;
  venue_state: string;
  venue_country: string;
}

export interface AdvertisedStart {
  seconds: number;
}

export interface RaceForm {
  distance: number;
  distance_type: DistanceType;
  distance_type_id: string;
  track_condition: TrackCondition;
  track_condition_id: string;
  weather?: Weather;
  weather_id?: string;
  race_comment: string;
  additional_data: string; // This is a JSON string
  generated: number;
  silk_base_url: string;
  race_comment_alternative: string;
}

export interface DistanceType {
  id: string;
  name: string;
  short_name: string;
}

export interface TrackCondition {
  id: string;
  name: string;
  short_name: string;
}

export interface Weather {
  id: string;
  name: string;
  short_name: string;
  icon_uri: string;
}

export interface RevealedRaceInfoData {
    revealed_race_info: RevealedRaceInfo;
}

export interface RevealedRaceInfo {
  track_name: string;
  state: string;
  country: string;
  number: number;
  race_name: string;
  time: string;
  class: string;
  start_type: string;
  prizemonies: Prizemonies;
  localised_prizemonies: LocalisedPrizemonies | null;
  rail_position: string;
  track_direction: string;
  track_surface: string;
  group: string;
  gait: string;
  track_home_straight_metres: number;
  track_circumference: number;
  race_comment_provider: string;
}

export interface Prizemonies {
  '1st'?: number;
  '2nd'?: number;
  '3rd'?: number;
  '4th'?: number;
  '5th'?: number;
  '6th'?: number;
  '7th'?: number;
  total_value: number;
}

export interface LocalisedPrizemonies {
  AUD: Prizemonies;
  NZD: Prizemonies;
}