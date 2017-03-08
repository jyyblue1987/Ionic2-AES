package com.hanover.billing.paymentus;



import org.apache.log4j.Logger;

public class RijndaelManager implements RijndaelConstants{
		
	private Logger log = Logger.getLogger(this.getClass().getName());
	
	public RijndaelManager() {
		
	}
	
	public String authenticationTicket(CustomerPaymentDTO customer) {
		log.debug("++++++++++++++ authenticationTicket()++++++++++++++");
		String ticket="";
		if ( !PaymentUSUtils.isEmpty(customer.getFirstName()))
		 ticket+=FIRSTNAME+PaymentUSUtils.maskNullNTrim(customer.getFirstName());
		if ( !PaymentUSUtils.isEmpty(customer.getLastName()))
			 ticket+=LASTNAME+PaymentUSUtils.maskNullNTrim(customer.getLastName());
		if ( !PaymentUSUtils.isEmpty(customer.getLoginid()))
			 ticket+=LOGINID+PaymentUSUtils.maskNullNTrim(customer.getLoginid());
		if ( !PaymentUSUtils.isEmpty(customer.getAccount()))
			 ticket+=ACCOUNTS+PaymentUSUtils.maskNullNTrim(customer.getAccount());		
		if ( !PaymentUSUtils.isEmpty(customer.getEmailAddress()))
			 ticket+=EMAIL+PaymentUSUtils.maskNullNTrim(customer.getEmailAddress());
		if ( !PaymentUSUtils.isEmpty(customer.getZipCode()))
			 ticket+=ZIPCODE+PaymentUSUtils.maskNullNTrim(customer.getZipCode());
		if ( !PaymentUSUtils.isEmpty(customer.getMobNumber()))
			 ticket+=MOBPHONE+PaymentUSUtils.maskNullNTrim(customer.getMobNumber());
		if ( !PaymentUSUtils.isEmpty(customer.getSourceSystem()))
			 ticket+=SOURCESYSTEM+PaymentUSUtils.maskNullNTrim(customer.getSourceSystem());
		if ( !PaymentUSUtils.isEmpty(customer.getPreSelected()))
			 ticket+=PRESELECTED+PaymentUSUtils.maskNullNTrim(customer.getPreSelected());
		String checkFreeTimeStamp = TIMESTAMP+PaymentUSUtils.getCheckFreeTimeStamp();
		ticket+= checkFreeTimeStamp;		
		System.out.println("customer ticket before space=  "+ticket);
		try {
			ticket =	PaymentusEncryption.encrypt(PaymentUSUtils.padOrTruncate(ticket));
//			ticket =	PaymentusEncryption.encrypt(ticket);
			
		} catch (Exception e) {
			log.error("Encryption error ="+e);
			e.printStackTrace();
		}
		System.out.println("encrypt ticket= "+ticket);
		return ticket;
	}	
	

}
