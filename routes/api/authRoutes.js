const express = require("express");

const ctrl = require("../../controllers/authControllers");

const { validateBody } = require("../../utils");

const { registerSchema } = require("../../utils/validation/userValidationSchemas");

const { loginSchema } = require("../../utils/validation/userValidationSchemas");

const {authenticate} = require("../../middlewares");

const router = express.Router();

//signup
router.post("/register", validateBody(registerSchema), ctrl.register);
//singin
router.post("/login", validateBody(loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

module.exports = router;
