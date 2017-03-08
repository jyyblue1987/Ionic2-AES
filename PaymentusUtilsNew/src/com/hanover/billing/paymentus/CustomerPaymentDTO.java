package com.hanover.billing.paymentus;


public class CustomerPaymentDTO {
	
	private String customerNo = "";
	private String emailAddress = "";	
	private String firstName = "";
	private String lastName = "";
	private String paymentTypeCode = "";
	private String loginid="";
	private String account="";
	private String mobNumber="";
	private String zipCode="";
	private String sourceSystem="";
	private String preSelected="";
	
	public String getCustomerNo() {
		return customerNo;
	}
	public void setCustomerNo(String customerNo) {
		this.customerNo = customerNo;
	}
	public String getEmailAddress() {
		return emailAddress;
	}
	public void setEmailAddress(String emailAddress) {
		this.emailAddress = emailAddress;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getPaymentTypeCode() {
		return paymentTypeCode;
	}
	public void setPaymentTypeCode(String paymentTypeCode) {
		this.paymentTypeCode = paymentTypeCode;
	}
	public String getLoginid() {
		return loginid;
	}
	public void setLoginid(String loginid) {
		this.loginid = loginid;
	}
	public String getAccount() {
		return account;
	}
	public void setAccount(String account) {
		this.account = account;
	}
	public String getMobNumber() {
		return mobNumber;
	}
	public void setMobNumber(String mobNumber) {
		this.mobNumber = mobNumber;
	}
	public void setZipCode(String zipCode) {
		this.zipCode = zipCode;
	}
	public String getZipCode() {
		return zipCode;
	}
	public void setSourceSystem(String sourceSystem) {
		this.sourceSystem = sourceSystem;
	}
	public String getSourceSystem() {
		return sourceSystem;
	}
	public void setPreSelected(String preSelected) {
		this.preSelected = preSelected;
	}
	public String getPreSelected() {
		return preSelected;
	}
	

}
