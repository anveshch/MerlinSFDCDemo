

public class weatherJsontoApex {

	public class Weather {
		@AuraEnabled public String icon {get;set;} 
		@AuraEnabled public Integer code {get;set;} 
		@AuraEnabled public String description {get;set;} 

		public Weather(JSONParser parser) {
			while (parser.nextToken() != System.JSONToken.END_OBJECT) {
				if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
					String text = parser.getText();
					if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
						if (text == 'icon') {
							icon = parser.getText();
						} else if (text == 'code') {
							code = parser.getIntegerValue();
						} else if (text == 'description') {
							description = parser.getText();
						} else {
							System.debug(LoggingLevel.WARN, 'Weather consuming unrecognized property: '+text);
							consumeObject(parser);
						}
					}
				}
			}
		}
	}
	
	@AuraEnabled public List<Data> data {get;set;} 
	@AuraEnabled public String city_name {get;set;} 
	@AuraEnabled public String lon {get;set;} 
	@AuraEnabled public String timezone {get;set;} 
	@AuraEnabled public String lat {get;set;} 
	@AuraEnabled public String country_code {get;set;} 
	@AuraEnabled public String state_code {get;set;} 

	public weatherJsontoApex(JSONParser parser) {
		while (parser.nextToken() != System.JSONToken.END_OBJECT) {
			if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
				String text = parser.getText();
				if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
					if (text == 'data') {
						data = arrayOfData(parser);
					} else if (text == 'city_name') {
						city_name = parser.getText();
					} else if (text == 'lon') {
						lon = parser.getText();
					} else if (text == 'timezone') {
						timezone = parser.getText();
					} else if (text == 'lat') {
						lat = parser.getText();
					} else if (text == 'country_code') {
						country_code = parser.getText();
					} else if (text == 'state_code') {
						state_code = parser.getText();
					} else {
						System.debug(LoggingLevel.WARN, 'weatherJsontoApex consuming unrecognized property: '+text);
						consumeObject(parser);
					}
				}
			}
		}
	}
	
	public class Data {
		@AuraEnabled public Integer moonrise_ts {get;set;} 
		@AuraEnabled public String wind_cdir {get;set;} 
		@AuraEnabled public Integer rh {get;set;} 
		@AuraEnabled public Double pres {get;set;} 
		@AuraEnabled public Double high_temp {get;set;} 
		@AuraEnabled public Integer sunset_ts {get;set;} 
		@AuraEnabled public Double ozone {get;set;} 
		@AuraEnabled public Double moon_phase {get;set;} 
		@AuraEnabled public Double wind_gust_spd {get;set;} 
		@AuraEnabled public Integer snow_depth {get;set;} 
		@AuraEnabled public Integer clouds {get;set;} 
		@AuraEnabled public Integer ts {get;set;} 
		@AuraEnabled public Integer sunrise_ts {get;set;} 
		@AuraEnabled public Double app_min_temp {get;set;} 
		@AuraEnabled public Double wind_spd {get;set;} 
		@AuraEnabled public Integer pop {get;set;} 
		@AuraEnabled public String wind_cdir_full {get;set;} 
		@AuraEnabled public Double slp {get;set;} 
		@AuraEnabled public Double moon_phase_lunation {get;set;} 
		@AuraEnabled public String valid_date {get;set;} 
		@AuraEnabled public Integer app_max_temp {get;set;} 
		@AuraEnabled public Double vis {get;set;} 
		@AuraEnabled public Double dewpt {get;set;} 
		@AuraEnabled public Integer snow {get;set;} 
		@AuraEnabled public Double uv {get;set;} 
		@AuraEnabled public Weather weather {get;set;} 
		@AuraEnabled public Integer wind_dir {get;set;} 
		@AuraEnabled public Object max_dhi {get;set;} 
		@AuraEnabled public Integer clouds_hi {get;set;} 
		@AuraEnabled public Double precip {get;set;} 
		@AuraEnabled public Double low_temp {get;set;} 
		@AuraEnabled public Double max_temp {get;set;} 
		@AuraEnabled public Integer moonset_ts {get;set;} 
		@AuraEnabled public String datetime_Z {get;set;} // in json: datetime
		@AuraEnabled public Double temp {get;set;} 
		@AuraEnabled public Double min_temp {get;set;} 
		@AuraEnabled public Integer clouds_mid {get;set;} 
		@AuraEnabled public Integer clouds_low {get;set;} 

		public Data(JSONParser parser) {
			while (parser.nextToken() != System.JSONToken.END_OBJECT) {
				if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
					String text = parser.getText();
					if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
						if (text == 'moonrise_ts') {
							moonrise_ts = parser.getIntegerValue();
						} else if (text == 'wind_cdir') {
							wind_cdir = parser.getText();
						} else if (text == 'rh') {
							rh = parser.getIntegerValue();
						} else if (text == 'pres') {
							pres = parser.getDoubleValue();
						} else if (text == 'high_temp') {
							high_temp = parser.getDoubleValue();
						} else if (text == 'sunset_ts') {
							sunset_ts = parser.getIntegerValue();
						} else if (text == 'ozone') {
							ozone = parser.getDoubleValue();
						} else if (text == 'moon_phase') {
							moon_phase = parser.getDoubleValue();
						} else if (text == 'wind_gust_spd') {
							wind_gust_spd = parser.getDoubleValue();
						} else if (text == 'snow_depth') {
							snow_depth = parser.getIntegerValue();
						} else if (text == 'clouds') {
							clouds = parser.getIntegerValue();
						} else if (text == 'ts') {
							ts = parser.getIntegerValue();
						} else if (text == 'sunrise_ts') {
							sunrise_ts = parser.getIntegerValue();
						} else if (text == 'app_min_temp') {
							app_min_temp = parser.getDoubleValue();
						} else if (text == 'wind_spd') {
							wind_spd = parser.getDoubleValue();
						} else if (text == 'pop') {
							pop = parser.getIntegerValue();
						} else if (text == 'wind_cdir_full') {
							wind_cdir_full = parser.getText();
						} else if (text == 'slp') {
							slp = parser.getDoubleValue();
						} else if (text == 'moon_phase_lunation') {
							moon_phase_lunation = parser.getDoubleValue();
						} else if (text == 'valid_date') {
							valid_date = parser.getText();
						} else if (text == 'app_max_temp') {
							app_max_temp = parser.getIntegerValue();
						} else if (text == 'vis') {
							vis = parser.getDoubleValue();
						} else if (text == 'dewpt') {
							dewpt = parser.getDoubleValue();
						} else if (text == 'snow') {
							snow = parser.getIntegerValue();
						} else if (text == 'uv') {
							uv = parser.getDoubleValue();
						} else if (text == 'weather') {
							weather = new Weather(parser);
						} else if (text == 'wind_dir') {
							wind_dir = parser.getIntegerValue();
						} else if (text == 'max_dhi') {
							max_dhi = parser.readValueAs(Object.class);
						} else if (text == 'clouds_hi') {
							clouds_hi = parser.getIntegerValue();
						} else if (text == 'precip') {
							precip = parser.getDoubleValue();
						} else if (text == 'low_temp') {
							low_temp = parser.getDoubleValue();
						} else if (text == 'max_temp') {
							max_temp = parser.getDoubleValue();
						} else if (text == 'moonset_ts') {
							moonset_ts = parser.getIntegerValue();
						} else if (text == 'datetime') {
							datetime_Z = parser.getText();
						} else if (text == 'temp') {
							temp = parser.getDoubleValue();
						} else if (text == 'min_temp') {
							min_temp = parser.getDoubleValue();
						} else if (text == 'clouds_mid') {
							clouds_mid = parser.getIntegerValue();
						} else if (text == 'clouds_low') {
							clouds_low = parser.getIntegerValue();
						} else {
							System.debug(LoggingLevel.WARN, 'Data consuming unrecognized property: '+text);
							consumeObject(parser);
						}
					}
				}
			}
		}
	}
	
	
	public static weatherJsontoApex parse(String json) {
		System.JSONParser parser = System.JSON.createParser(json);
		return new weatherJsontoApex(parser);
	}
	
    public static void consumeObject(System.JSONParser parser) {
		Integer depth = 0;
		do {
			System.JSONToken curr = parser.getCurrentToken();
			if (curr == System.JSONToken.START_OBJECT || 
				curr == System.JSONToken.START_ARRAY) {
				depth++;
			} else if (curr == System.JSONToken.END_OBJECT ||
				curr == System.JSONToken.END_ARRAY) {
				depth--;
			}
		} while (depth > 0 && parser.nextToken() != null);
	}
	







    private static List<Data> arrayOfData(System.JSONParser p) {
        List<Data> res = new List<Data>();
        if (p.getCurrentToken() == null) p.nextToken();
        while (p.nextToken() != System.JSONToken.END_ARRAY) {
            res.add(new Data(p));
        }
        return res;
    }












}