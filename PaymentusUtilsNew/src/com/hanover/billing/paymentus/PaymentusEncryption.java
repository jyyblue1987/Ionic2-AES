package com.hanover.billing.paymentus;



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


public class PaymentusEncryption {	
		 
	private static Logger log = Logger
	.getLogger(PaymentusEncryption.class.getName()); 
	  static String encryptionKey = "882E91D56547F1CF7ED6BAAD9C3EAAF5"; //AppProperties.getAttribute("ENCRYPTIONKEY");  
	  //"6A8CCD425D5A4822FC7E09986288381E";
	  /*public static void main(String [] args) {
	    try {

	      System.out.println("Rijndael/ECB/NoPadding Encrypt/Decrypt");
	      System.out.println("plain:   " + plaintext);
	      
	      byte[] hexbytes = Hex.decodeHex(encryptionKey.toCharArray());
		  System.out.println("HexKey to Bytes"+new String(hexbytes, "UTF-8"));

	      String cipher = encrypt(plaintext, hexbytes);

	      System.out.print("Encrypt:  "+cipher);
	           
	      System.out.println("\n*****");	      
	      byte[] hexbytesCipher = Hex.decodeHex(cipher.toCharArray());
	      String decrypted = decrypt(hexbytesCipher, hexbytes);
	      System.out.println("decrypt: " + decrypted);

	    } catch (Exception e) {
	      e.printStackTrace();
	    } 
	  }*/

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

	 /* public static String decrypt(String cipherText) throws Exception{
		  byte[] hexbytes2 = Hex.decodeHex(encryptionKey.toCharArray());
		  byte[] hexcipherText = Hex.decodeHex(cipherText.toCharArray());
		     Cipher cipher = Cipher.getInstance("Rijndael/ECB/NoPadding", "SunJCE");
		     SecretKeySpec key = new SecretKeySpec(hexbytes2,"Rijndael");
		     cipher.init(Cipher.DECRYPT_MODE, key); 
		     return new String(cipher.doFinal(hexcipherText),"UTF-8");
		   } 
      */
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
