package com.company.billing.paymentprovider;



import java.io.UnsupportedEncodingException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.SecretKeySpec;

import org.apache.commons.codec.DecoderException;
import org.apache.commons.codec.binary.Hex;
import org.apache.log4j.Logger;


public class PaymentProviderEncryption {	
		 
	private static Logger log = Logger
	.getLogger(PaymentProviderEncryption.class.getName()); 
	  static String encryptionKey = "882E91D56547F1CF7ED6BAAD9C3EAAF5"; 

	  public static String encrypt(String plainText) {	  
		
		String hexencrypt =null;	
			
			try {
				
				byte[] hexbytes = Hex.decodeHex(encryptionKey.toCharArray());			
				Cipher cipher = Cipher.getInstance("AES/ECB/NoPadding");
				SecretKeySpec key = new SecretKeySpec(hexbytes,"AES");
			    cipher.init(Cipher.ENCRYPT_MODE, key);
			    byte[] byteDataToEncrypt = plainText.getBytes("UTF-8");
				byte[] byteCipherText = cipher.doFinal(byteDataToEncrypt);		
				hexencrypt = getHexString(byteCipherText);		 
				
			} catch (DecoderException e) {
				log.error("DecoderException: "+e);
				e.printStackTrace();
			} catch (NoSuchAlgorithmException e) {
				log.error("NoSuchAlgorithmException: "+e);
				e.printStackTrace();
			} catch (NoSuchPaddingException e) {
				log.error("NoSuchPaddingException: "+e);
				e.printStackTrace();
			} catch (InvalidKeyException e) {
				log.error("InvalidKeyException: "+e);
				e.printStackTrace();
			} catch (UnsupportedEncodingException e) {
				log.error("UnsupportedEncodingException: "+e);
				e.printStackTrace();
			} catch (IllegalBlockSizeException e) {
				log.error("IllegalBlockSizeException: "+e);
				e.printStackTrace();
			} catch (BadPaddingException e) {
				log.error("BadPaddingException: "+e);
				e.printStackTrace();
			}	
	    return hexencrypt; 	    

	  }

	  public static String getHexString (byte[] s) 
	  {
	      byte[] buf = s;

	      StringBuffer sb = new StringBuffer();

	      for (int i = 0; i < buf.length; i++) {
	    	  sb.append(Integer.toString((buf[i] & 0xff) + 0x100, 16).substring(1));
	    	  }

	          return sb.toString().toUpperCase();
	  }



}
