public class weatherJSONConversion{
	public cls_data[] data;
	public String city_name;	//Raleigh
	public String lon;	//-78.63861
	public String timezone;	//America/New_York
	public String lat;	//35.7721
	public String country_code;	//US
	public String state_code;	//NC
	class cls_data {
		public Integer moonrise_ts;	//1625291549
		public String wind_cdir;	//NW
		public Integer rh;	//56
		public Double pres;	//1000.7708
		public Double high_temp;	//28.7
		public Integer sunset_ts;	//1625358885
		public Double ozone;	//337.625
		public Double moon_phase;	//0.231902
		public Double wind_gust_spd;	//10.6953125
		public Integer snow_depth;	//0
		public Integer clouds;	//22
		public Integer ts;	//1625284860
		public Integer sunrise_ts;	//1625306504
		public Double app_min_temp;	//20.8
		public Double wind_spd;	//2.9858334
		public Integer pop;	//20
		public String wind_cdir_full;	//northwest
		public Double slp;	//1010.6458
		public Double moon_phase_lunation;	//0.8
		public String valid_date;	//2021-07-03
		public Integer app_max_temp;	//28
		public Double vis;	//22.1005
		public Double dewpt;	//14.7
		public Integer snow;	//0
		public Double uv;	//10.676525
		public cls_weather weather;
		public Integer wind_dir;	//305
		public cls_max_dhi max_dhi;
		public Integer clouds_hi;	//16
		public Double precip;	//0.0625
		public Double low_temp;	//20.9
		public Double max_temp;	//28.8
		public Integer moonset_ts;	//1625342377
		//public String datetime;	//2021-07-03
		public Double temp;	//24.9
		public Double min_temp;	//20.7
		public Integer clouds_mid;	//19
		public Integer clouds_low;	//15
	}
	class cls_weather {
		public String icon;	//c02d
		public Integer code;	//802
		public String description;	//Scattered clouds
	}
	class cls_max_dhi {
	}
	public static weatherJSONConversion parse(String json){
		return (weatherJSONConversion) System.JSON.deserialize(json, weatherJSONConversion.class);
	}

	
}