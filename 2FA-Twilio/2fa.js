const { totp, authenticator } = require('otplib') ;
const twilio = require('twilio');
const secret = authenticator.generateSecret();

const SendCodeToVerifyPhone = async (req, res, next) => {
  try {
    validateRequest(req);

    const token = totp.generate(secret);
    const expirationTime = new Date().getTime() + 300000;

    const message = await twilio.messages.create({
      body: `Your verification code is: ${token}. This code will expire in 5 minutes.`,
      from: twilioFromNumber,
      to: req.body.phoneNumber
    });

    if (message?.body && !message.errorCode) {
      const verificationData = {
        userId: req.user._id,
        code: digitalNumber,
        expireIn: expirationTime,
        status: 'Unverified',
        phoneNumber: req.body.phoneNumber,
        type: 'phoneNumber'
      };
      const existingData = await VerificationService.getDataById(req.user._id, 'phoneNumber');

      if (existingData && existingData._id) {
        await VerificationService.updateVerificationCode({
          userId: req.user._id,
          type: 'phoneNumber'
        }, verificationData);

        return res.status(200).send({status: true, message: 'Success'});
      } else {
        await VerificationService.saveVerificationCode(verificationData);

        return res.status(200).send({status: true, message: 'Success'});
      }
    } else {
      return res.status(200).send({status: false, message: 'Error!'});
    }

  } catch (err) {
    next(err);
  }
};

const ConfirmAndUpdatePhoneNumber = async (req, res, next) => {
  try {
    validateRequest(req);

    const existingData = await VerificationService.getDataByUserId(req.user._id, 'phoneNumber');
    const isValid = totp.check(req.body.code, secret);

    if (new Date().getTime() - existingData.expireIn.getTime() > 300000) {
      return res.status(200).send({
        status: false,
        message: 'Sorry. Validation time has expired',
      });
    } else if (!isValid) {
      return res.status(200).send({
        status: false,
        message: 'Digit code is not valid. Try again!',
      });
    }

    const verificationResult = await VerificationService.updateVerificationCode({
        userId: req.user._id,
        type: 'phoneNumber'
      },
      { status: 'Verified' });

    const phoneNumber = {
      number: verificationResult.phoneNumber.replace(/-/g, '').replace(/ /g, ''),
      state: req.body.state
    };

    const userByNumber = await UserService.getUser(phoneNumber.number);

    if (userByNumber && userByNumber._id && userByNumber._id.toString() !== req.user._id.toString()) {
      return res.status(200).send({
        status: false,
        message: 'This phone number has already been registered!'
      });
    }

    const user = await UserService.updateUser({phoneNumber}, req.user._id);
    user.phoneNumber = phoneNumber;

    return res.status(200).send({
      status: true,
      message: `Your phone number has successfully ${req.body.state}!`,
      user
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  SendCodeToVerifyPhone,
  ConfirmAndUpdatePhoneNumber,
}
