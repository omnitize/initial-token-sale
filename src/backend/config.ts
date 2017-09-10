
export class Config {

	recaptchaUrl = 'https://www.google.com/recaptcha/api/siteverify';
	recaptchaSiteSecret = process.env.RECAPTCHA_SITE_SECRET || '6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe';

	sessionTokenSize = 32;

	mysqlServer = process.env.MYSQL_SERVER || 'mysql-dev.chlrlmqjpsxl.us-east-1.rds.amazonaws.com';
	mysqlUsername = process.env.MYSQL_USERNAME || 'admin';
	mysqlPassword = process.env.MYSQL_PASSWORD || 'admin123';
	mysqlSchema = process.env.MYSQL_SCHEMA || 'omnitize_dev';

	etherScanApiKey = 'B22IXM9T92V6BSNFSE14ICXQJVS8NRZ7FA';
	etherMinimumConfirmations = 6;

	tokenDiscountPercent = 50;	
	tokenPriceInEther = 0.01;
};

export const config = new Config();
