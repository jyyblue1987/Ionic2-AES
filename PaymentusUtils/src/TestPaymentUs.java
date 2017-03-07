import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

import org.apache.commons.codec.DecoderException;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.codec.binary.Hex;

import com.company.billing.paymentprovider.CustomerPaymentDTO;
import com.company.billing.paymentprovider.RijndaelManager;

import sun.misc.BASE64Encoder;


public class TestPaymentUs {

	/**
	 * @param args
	 */
	public static void main(String[] args) {

		
		   RijndaelManager Rijn = new RijndaelManager();
		   CustomerPaymentDTO paymentDTO = new CustomerPaymentDTO();			   
		   paymentDTO.setEmailAddress("test@test.com");
		   paymentDTO.setLoginid("e5a0f046cd5a0f3a48b84a84b4359e25");
		   paymentDTO.setFirstName("TIMOTHY");
		   paymentDTO.setLastName("STEGINK");		   
		   paymentDTO.setAccount("HNW9965762"); //form.getSelectedPolicySymb()+form.getSelectedPolicyNumber()
		   paymentDTO.setSourceSystem("MHP");
		   paymentDTO.setPreSelected("2109171540001000"); //form.getSelectedBillScheduleNum()
		   String encryptedPaymentusVariables = Rijn.authenticationTicket(paymentDTO);
		   String payMyBillURL = "https://test.paymentprovider.com/cp/hoig/make-payment-express?authToken="+encryptedPaymentusVariables;
		   System.out.println("payMyBillURL = "+payMyBillURL);
		   
		   
		   String encryptionKey = "882E91D56547F1CF7ED6BAAD9C3EAAF5";
		   String vec = "2811da22377d62fcfdb02f29aad77d9e"; // 16 bytes IV
		   try {
			   byte[] hexbytes = Hex.decodeHex(encryptionKey.toCharArray());
			   byte[] initVector = Hex.decodeHex(vec.toCharArray());
		       
		       byte [] encrypted = encrypt(hexbytes, initVector, "AES is testing");
		       
		       String ret = com.sun.org.apache.xml.internal.security.utils.Base64.encode(encrypted);
		       System.out.println("Encrypt: " + ret + "\n");
		       
		       String ok = decrypt(hexbytes, initVector, encrypted);
		       System.out.println(ok);
			   
			} catch (DecoderException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}	
		   
	       
	}
	
	public static byte[] encrypt(byte []hexbytes, byte []initVector, String value) {
        try {
            IvParameterSpec iv = new IvParameterSpec(initVector);
            SecretKeySpec skeySpec = new SecretKeySpec(hexbytes, "AES");

            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5PADDING");
            cipher.init(Cipher.ENCRYPT_MODE, skeySpec, iv);

            byte[] encrypted = cipher.doFinal(value.getBytes());           
            
            return encrypted;
            
        } catch (Exception ex) {
            ex.printStackTrace();
        }

        return null;
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

    public static String decrypt(byte []hexbytes, byte[] initVector, byte[] encrypted) {
        try {
            IvParameterSpec iv = new IvParameterSpec(initVector);
            SecretKeySpec skeySpec = new SecretKeySpec(hexbytes, "AES");

            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5PADDING");
            cipher.init(Cipher.DECRYPT_MODE, skeySpec, iv);

            byte[] original = cipher.doFinal(encrypted);

            return new String(original);
        } catch (Exception ex) {
            ex.printStackTrace();
        }

        return null;
    }

	
}
