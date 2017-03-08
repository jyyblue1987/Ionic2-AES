package com.hanover.billing.paymentus;



import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.rmi.server.UID;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;

import org.apache.log4j.Logger;


public class PaymentUSUtils {
	private static Logger log = Logger.getLogger(PaymentUSUtils.class.getName());
	private static String environment = System.getProperty("env");
	 
	public static String getEnvironment()
	{
		if (environment == null || environment.equals("") )
		{
			environment="unt";
		}	
		log.debug("environment " + environment );
		return environment;
	}
	
	
	/**
	 * The current time formated as required at Check Free 
	 * Format is "yyyyMMddhhmmss" time zone is GMT
	 * @return String - The formated time stamp
	 * 
	 */
	public static Long getCheckFreeTimeStamp()
	{
		Long now = System.currentTimeMillis();
		return now;
	}	
	
	/**
	 * Returns the number of digits in a string
	 * @param String param - The string that is being checked
	 * 
	 */
	public static int numberOfDigits( String param)
	{
		int num = 0;
		if (param != null)
		{
			for (int i = 0 ; i != param.length() ; ++i )
			{
				if ( Character.isDigit(param.charAt(i)) )
				{
					++num;
				}
			}
		}
		return num;
	}
	
	/**
	 * Returns the numebr of letters in a string
	 * 
	 * @param String param - The string that is being checked
	 * 
	 */
	public static int numberOfLetters( String param )
	{
		int num = 0;
		
		if (param != null)
		{
			for (int i = 0 ; i != param.length() ; ++i )
			{
				if ( Character.isLetter(param.charAt(i)) )
				{
					++num;
				}
			}
		}
		return num;
	}

	/**
	 * Varify a string is not null or empty. 
	 * 
	 * @param String param - The string that is being checked
	 * @return boolean - true is param is not null or empty.
	 */
	public static boolean isEmpty( String param )
	{
		return(( param == null) || (param.trim().length() == 0)); 
	}
	
	    public static String removeSpecialChars(String text)
	    {
	        if (text == null)
	            return "&nbsp;";
	        StringBuffer buf = new StringBuffer();
	        char[] chars = text.toCharArray();
	        for (int i = 0; i < chars.length; i++)
	        {
	            if (Character.isLetterOrDigit(chars[i]))
	            {
	                buf.append(chars[i]);
	            }
	        }
	        return buf.toString();
	    }


	    /**
	     * This method encodes query string parameters so that they will not be
	     * interpreted as special characters in URLs
	     * 
	     * This is just a wrapper around the URLEncoder.encode method. The method
	     * which only took the string is deprecated and was replaced by one where
	     * you also have to pass in the encoding type, but the only value allowed is
	     * UTF-8.
	     * 
	     * @param s
	     * @return
	     * @author Luke Landry
	     */
	    public static String encodeQueryParams(String s)
	    {
	        try
	        {
	            return URLEncoder.encode(s, "UTF-8");
	        } catch (UnsupportedEncodingException e)
	        {
	            log.fatal("UnsupportedEncodingException thrown", e);
	            return s;
	        }
	    }

	    /**
	     * Check for null and return a trimmed string
	     * 
	     * @param s
	     * @return
	     * @author Luke Landry
	     */
	    public static String maskNullNTrim(String s)
	    {
	        if (s == null)
	        {
	            return "";
	        } else
	        {
	            return s.trim();
	        }
	    }

	    /**
	     * Pads with spaces or truncates a string to produce a string of a given
	     * length
	     * 
	     * @param s
	     * @param len
	     * @return
	     * @author Luke Landry
	     */
	    public static String padOrTruncate(String str)
	    {
	        
	        StringBuilder sb = new StringBuilder();

	        sb.append(str);

	        if((str.length()%32)==0){

	        return str;

	        }else{

	        while((str.length()%32)!=0){

	        str = sb.append(" ").toString();

	        }
	            return sb.toString();
	        }
	    }

	    /**
	     * Generate a globally unique id
	     * 
	     * @return
	     */
	    public static String generateGuid()
	    {
	        UID uid = new UID();
	        return uid.toString().replaceAll(":", "H").replaceAll("-", "G");
	    }

	    
	    /**
	     * integerValue(String) returns 0 or a number -
	     * use this method when a string value is optional
	     * @param strNum
	     * @return
	     */
	    public static int integerValue(String strNum) {
	    	int val  = 0;
			try {
				val = Integer.parseInt(maskNullNTrim(strNum));
			} catch (NumberFormatException e) {
			}
	    	return val;
	    }

}
