package com.company.billing.paymentprovider;



import org.apache.log4j.Logger;

public class RijndaelManager implements RijndaelConstants{
		
	private Logger log = Logger.getLogger(this.getClass().getName());
	
	public RijndaelManager() {
		
	}
	
	public String authenticationTicket(CustomerPaymentDTO customer) {
		log.debug("++++++++++++++ authenticationTicket()++++++++++++++");
		String ticket="";
		if ( !PaymentProviderUSUtils.isEmpty(customer.getFirstName()))
		 ticket+=FIRSTNAME+PaymentProviderUSUtils.maskNullNTrim(customer.getFirstName());
		if ( !PaymentProviderUSUtils.isEmpty(customer.getLastName()))
			 ticket+=LASTNAME+PaymentProviderUSUtils.maskNullNTrim(customer.getLastName());
		if ( !PaymentProviderUSUtils.isEmpty(customer.getLoginid()))
			 ticket+=LOGINID+PaymentProviderUSUtils.maskNullNTrim(customer.getLoginid());
		if ( !PaymentProviderUSUtils.isEmpty(customer.getAccount()))
			 ticket+=ACCOUNTS+PaymentProviderUSUtils.maskNullNTrim(customer.getAccount());		
		if ( !PaymentProviderUSUtils.isEmpty(customer.getEmailAddress()))
			 ticket+=EMAIL+PaymentProviderUSUtils.maskNullNTrim(customer.getEmailAddress());
		if ( !PaymentProviderUSUtils.isEmpty(customer.getZipCode()))
			 ticket+=ZIPCODE+PaymentProviderUSUtils.maskNullNTrim(customer.getZipCode());
		if ( !PaymentProviderUSUtils.isEmpty(customer.getMobNumber()))
			 ticket+=MOBPHONE+PaymentProviderUSUtils.maskNullNTrim(customer.getMobNumber());
		if ( !PaymentProviderUSUtils.isEmpty(customer.getSourceSystem()))
			 ticket+=SOURCESYSTEM+PaymentProviderUSUtils.maskNullNTrim(customer.getSourceSystem());
		if ( !PaymentProviderUSUtils.isEmpty(customer.getPreSelected()))
			 ticket+=PRESELECTED+PaymentProviderUSUtils.maskNullNTrim(customer.getPreSelected());
		String checkFreeTimeStamp = TIMESTAMP+PaymentProviderUSUtils.getCheckFreeTimeStamp();
		ticket+= checkFreeTimeStamp;		
		System.out.println("customer ticket before space=  "+ticket);
		try {
			ticket =	PaymentProviderEncryption.encrypt(PaymentProviderUSUtils.padOrTruncate(ticket));
			
		} catch (Exception e) {
			log.error("Encryption error ="+e);
			e.printStackTrace();
		}
		System.out.println("encrypt ticket= "+ticket);
		return ticket;
	}	
	

}
