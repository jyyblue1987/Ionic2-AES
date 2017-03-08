import com.hanover.billing.paymentus.CustomerPaymentDTO;
import com.hanover.billing.paymentus.RijndaelManager;


public class TestPaymentus {

	/**
	 * @param args
	 */
	public static void main(String[] args) {

		// firstName=TIMOTHY;lastName=STEGINK;loginId=e5a0f046cd5a0f3a48b84a84b4359e25;accounts=HNW9965762;email=ngujjari03012@hanover.com;sourceSystem=MHP;preselectedAccounts=2109171540001000;timestamp=1488398471348 
		
		   RijndaelManager Rijn = new RijndaelManager();
		   CustomerPaymentDTO paymentDTO = new CustomerPaymentDTO();			   
		   paymentDTO.setEmailAddress("t");
		   paymentDTO.setLoginid("e5a0f046cd5a0f3a48b84a84b4359e25");
		   paymentDTO.setFirstName("TIMOTHY");
		   paymentDTO.setLastName("STEGINK");		   
		   paymentDTO.setAccount("HNW9965762"); //form.getSelectedPolicySymb()+form.getSelectedPolicyNumber()
		   paymentDTO.setSourceSystem("MHP");
		   paymentDTO.setPreSelected("2109171540001000"); //form.getSelectedBillScheduleNum()
		   String encryptedPaymentusVariables = Rijn.authenticationTicket(paymentDTO);
		   String payMyBillURL = "https://secure2.paymentus.com/cp/hoig/make-payment-express?authToken="+encryptedPaymentusVariables;
		   System.out.println("payMyBillURL = "+payMyBillURL);
	}

}
