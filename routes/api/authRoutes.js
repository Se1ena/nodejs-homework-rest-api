const express = require("express");

const ctrl = require("../../controllers/authControllers");

const { validateBody } = require("../../utils");

const { registerSchema } = require("../../utils/validation/userValidationSchemas");

const { loginSchema } = require("../../utils/validation/userValidationSchemas");

const {emailSchema} = require("../../utils/validation/userValidationSchemas");

const {authenticate, upload} = require("../../middlewares");

const router = express.Router();

//signup
router.post("/register", validateBody(registerSchema), ctrl.register);

router.get("/verify/:verificationToken", ctrl.verify);

router.post("/resend-verify-email", validateBody(emailSchema), ctrl.resendVerifyEmail);

//singin
router.post("/login", validateBody(loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch("/avatars", authenticate, upload.single("avatar"), ctrl.updateAvatar);

module.exports = router;
